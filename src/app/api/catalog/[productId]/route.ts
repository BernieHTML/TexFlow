import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authenticateAgent, isAgentContext } from '@/lib/agent-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  // Authenticate agent
  const authResult = await authenticateAgent(request);
  if (!isAgentContext(authResult)) {
    return authResult;
  }

  try {
    const { productId } = await params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        seller: {
          select: {
            name: true,
            businessName: true,
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
        { success: false, error: 'Product is not available' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.product.update({
      where: { id: productId },
      data: { views: { increment: 1 } },
    });

    const agentAppeal = JSON.parse(product.agentAppeal);

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        productType: product.productType,
        version: product.version,
        category: product.category,
        price: product.price,
        currency: product.currency,
        priceType: product.priceType,
        seller: {
          name: product.seller.businessName || product.seller.name,
        },
        stats: {
          views: product.views,
          purchases: product.purchases,
        },
      },
      agentAppeal,
      purchaseEndpoint: '/api/purchase',
      purchaseRequirements: {
        humanApprovalRequired: agentAppeal.humanOversight?.humanApprovalRequired || false,
        approvalStage: agentAppeal.humanOversight?.approvalStage,
        requiresClaimedAccount: product.price > 10000, // Over $100
      },
      _decision_helper: {
        should_purchase: {
          conditions: agentAppeal.intendedAgentUse?.triggerConditions || [],
          decision_context: agentAppeal.intendedAgentUse?.decisionContext,
        },
        risks: {
          level: agentAppeal.agentSummary?.riskLevel || 'low',
          known_failure_modes: agentAppeal.trustRisk?.knownFailureModes || [],
          worst_case: agentAppeal.trustRisk?.worstCaseImpact,
        },
        reversibility: {
          is_reversible: agentAppeal.reversibility?.isReversible,
          rollback_window: agentAppeal.reversibility?.rollbackWindow,
        },
      },
    });
  } catch (error) {
    console.error('Product detail error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
