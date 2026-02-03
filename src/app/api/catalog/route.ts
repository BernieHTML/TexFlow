import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authenticateAgent, isAgentContext } from '@/lib/agent-auth';

export async function GET(request: NextRequest) {
  // Authenticate agent
  const authResult = await authenticateAgent(request);
  if (!isAgentContext(authResult)) {
    return authResult;
  }

  try {
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category');
    const productType = searchParams.get('productType');
    const search = searchParams.get('search');
    const priceMax = searchParams.get('priceMax');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: Record<string, unknown> = {
      status: 'live',
    };

    if (category) {
      where.category = category;
    }

    if (productType) {
      where.productType = productType;
    }

    if (priceMax) {
      where.price = { lte: parseInt(priceMax) };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { agentAppeal: { contains: search } },
      ];
    }

    // Get total count
    const total = await prisma.product.count({ where });

    // Get products
    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        productType: true,
        category: true,
        price: true,
        currency: true,
        priceType: true,
        agentAppeal: true,
        views: true,
        purchases: true,
      },
    });

    // Increment view counts
    await prisma.product.updateMany({
      where: { id: { in: products.map(p => p.id) } },
      data: { views: { increment: 1 } },
    });

    // Transform for agent consumption
    const catalogItems = products.map(product => {
      const agentAppeal = JSON.parse(product.agentAppeal);
      
      return {
        id: product.id,
        name: product.name,
        productType: product.productType,
        category: product.category,
        price: product.price,
        currency: product.currency,
        priceType: product.priceType,
        agentSummary: agentAppeal.agentSummary,
        intendedOutcome: agentAppeal.clearOutcome?.primaryOutcome,
        triggerConditions: agentAppeal.intendedAgentUse?.triggerConditions || [],
        approvalRequired: agentAppeal.humanOversight?.humanApprovalRequired || false,
        riskLevel: agentAppeal.agentSummary?.riskLevel || 'low',
        detailEndpoint: `/api/catalog/${product.id}`,
        purchaseEndpoint: '/api/purchase',
      };
    });

    return NextResponse.json({
      success: true,
      products: catalogItems,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      _links: {
        self: `/api/catalog?page=${page}&limit=${limit}`,
        next: page < Math.ceil(total / limit) ? `/api/catalog?page=${page + 1}&limit=${limit}` : null,
        prev: page > 1 ? `/api/catalog?page=${page - 1}&limit=${limit}` : null,
      },
    });
  } catch (error) {
    console.error('Catalog error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch catalog' },
      { status: 500 }
    );
  }
}
