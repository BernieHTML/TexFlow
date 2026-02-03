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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const skip = (page - 1) * limit;

    const total = await prisma.transaction.count({
      where: { agentId: authResult.agentId },
    });

    const transactions = await prisma.transaction.findMany({
      where: { agentId: authResult.agentId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        product: {
          select: {
            name: true,
            productType: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      transactions: transactions.map(t => ({
        id: t.id,
        productId: t.productId,
        productName: t.product.name,
        productType: t.product.productType,
        grossAmount: t.grossAmount,
        currency: t.currency,
        status: t.status,
        createdAt: t.createdAt,
        completedAt: t.completedAt,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Transactions error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
