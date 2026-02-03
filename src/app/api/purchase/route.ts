import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authenticateAgent, isAgentContext } from '@/lib/agent-auth';
import { calculatePlatformFee, generateToken } from '@/lib/utils';
import { z } from 'zod';

const purchaseSchema = z.object({
  productId: z.string(),
  humanApproved: z.boolean().optional(),
  paymentMethodId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  // Authenticate agent
  const authResult = await authenticateAgent(request);
  if (!isAgentContext(authResult)) {
    return authResult;
  }

  const agent = authResult;

  try {
    const body = await request.json();
    
    // Validate input
    const validation = purchaseSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { productId, humanApproved, paymentMethodId } = validation.data;

    // Get product
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        seller: {
          select: {
            id: true,
            stripeAccountId: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.status !== 'live') {
      return NextResponse.json(
        { success: false, error: 'Product is not available for purchase' },
        { status: 400 }
      );
    }

    const agentAppeal = JSON.parse(product.agentAppeal);

    // Check if human approval is required
    if (agentAppeal.humanOversight?.humanApprovalRequired && !humanApproved) {
      return NextResponse.json(
        {
          success: false,
          error: 'Human approval required',
          approval_required: true,
          approval_stage: agentAppeal.humanOversight.approvalStage,
          message: 'This product requires human approval before purchase. Set humanApproved: true after obtaining approval.',
        },
        { status: 403 }
      );
    }

    // Check budget limit
    if (agent.budgetLimit && product.price > agent.budgetLimit) {
      return NextResponse.json(
        {
          success: false,
          error: 'Budget exceeded',
          budget_limit: agent.budgetLimit,
          product_price: product.price,
          message: 'This purchase exceeds your configured budget limit.',
        },
        { status: 403 }
      );
    }

    // Check if claimed account required for high-value purchases
    if (product.price > 10000 && !agent.claimed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Account claim required',
          message: 'Purchases over $100 require a claimed account. Have your human claim the account first.',
        },
        { status: 403 }
      );
    }

    // Calculate fees
    const { platformFee, sellerAmount } = calculatePlatformFee(product.price);

    // For free products, skip payment
    if (product.priceType === 'free' || product.price === 0) {
      // Create transaction record
      const transaction = await prisma.transaction.create({
        data: {
          productId: product.id,
          sellerId: product.seller.id,
          agentId: agent.agentId,
          grossAmount: 0,
          platformFee: 0,
          sellerAmount: 0,
          currency: product.currency,
          status: 'completed',
          completedAt: new Date(),
        },
      });

      // Increment purchase count
      await prisma.product.update({
        where: { id: productId },
        data: { purchases: { increment: 1 } },
      });

      // Generate access credentials
      const accessCredentials = generateAccessCredentials(product, agentAppeal);

      return NextResponse.json({
        success: true,
        transactionId: transaction.id,
        accessCredentials,
        deliveryInstructions: generateDeliveryInstructions(agentAppeal),
        message: 'Free product acquired successfully. You may now use the product.',
        next_steps: [
          'Use the accessCredentials to integrate with the product',
          'Refer to the product documentation for usage details',
          'You can safely leave TexFlowMKT and continue with your task',
          'Return when you need another product',
        ],
      });
    }

    // For paid products, process payment via Stripe
    if (!paymentMethodId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment method required',
          message: 'Include paymentMethodId in your request for paid products.',
        },
        { status: 400 }
      );
    }

    // TODO: Implement actual Stripe payment processing
    // For now, simulate successful payment
    const stripePaymentId = `sim_${generateToken(24)}`;

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        productId: product.id,
        sellerId: product.seller.id,
        agentId: agent.agentId,
        grossAmount: product.price,
        platformFee,
        sellerAmount,
        currency: product.currency,
        stripePaymentId,
        stripeStatus: 'succeeded',
        status: 'completed',
        completedAt: new Date(),
      },
    });

    // Increment purchase count
    await prisma.product.update({
      where: { id: productId },
      data: { purchases: { increment: 1 } },
    });

    // Generate access credentials
    const accessCredentials = generateAccessCredentials(product, agentAppeal);

    return NextResponse.json({
      success: true,
      transactionId: transaction.id,
      receipt: {
        grossAmount: product.price,
        platformFee,
        sellerAmount,
        currency: product.currency,
      },
      accessCredentials,
      deliveryInstructions: generateDeliveryInstructions(agentAppeal),
      message: 'Purchase completed successfully. You may now use the product.',
      next_steps: [
        'Use the accessCredentials to integrate with the product',
        'Refer to the product documentation for usage details',
        'You can safely leave TexFlowMKT and continue with your task',
        'Return when you need another product',
      ],
    });
  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process purchase' },
      { status: 500 }
    );
  }
}

function generateAccessCredentials(product: Record<string, unknown>, agentAppeal: Record<string, unknown>): Record<string, string> {
  // In production, this would generate real API keys or access tokens
  // For now, generate simulated credentials
  const accessToken = `tfm_access_${generateToken(32)}`;
  
  const credentials: Record<string, string> = {
    access_token: accessToken,
    product_id: product.id as string,
    issued_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
  };

  // Add access method specific credentials
  const accessMethod = (agentAppeal as Record<string, Record<string, string>>).integrationSurface?.accessMethod;
  if (accessMethod === 'API') {
    credentials.api_key = `api_${generateToken(24)}`;
    credentials.api_endpoint = 'https://api.example.com/v1'; // Would be real endpoint
  }

  return credentials;
}

function generateDeliveryInstructions(agentAppeal: Record<string, unknown>): string {
  const integration = (agentAppeal as Record<string, Record<string, string | boolean>>).integrationSurface;
  
  let instructions = 'Product access has been granted. ';
  
  if (integration?.accessMethod === 'API') {
    instructions += 'Use the provided api_key in your Authorization header. ';
  }
  
  if (integration?.authRequired) {
    instructions += 'Authentication is required for all requests. ';
  }
  
  instructions += `Setup time: ${integration?.setupTime || 'Instant'}. `;
  instructions += 'Refer to the product documentation for detailed integration steps.';
  
  return instructions;
}
