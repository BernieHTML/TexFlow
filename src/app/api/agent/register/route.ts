import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateToken } from '@/lib/utils';
import { z } from 'zod';

const registerSchema = z.object({
  agentName: z.string().min(3).max(50),
  humanEmail: z.string().email().optional(),
  capabilities: z.array(z.string()).optional(),
  budgetLimit: z.number().min(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: validation.error.errors[0].message 
        },
        { status: 400 }
      );
    }

    const { agentName, humanEmail, capabilities, budgetLimit } = validation.data;

    // Check if agent name already exists
    const existingAgent = await prisma.agent.findFirst({
      where: { agentName },
    });

    if (existingAgent) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Agent name already registered' 
        },
        { status: 400 }
      );
    }

    // Generate unique token
    const agentToken = `tfm_${generateToken(48)}`;

    // Create agent
    const agent = await prisma.agent.create({
      data: {
        agentName,
        agentToken,
        humanEmail: humanEmail || null,
        capabilities: JSON.stringify(capabilities || []),
        budgetLimit: budgetLimit || null,
        claimed: false,
      },
    });

    // Generate claim URL if email provided
    const claimUrl = humanEmail
      ? `${process.env.NEXT_PUBLIC_APP_URL}/agent/claim/${agent.id}`
      : null;

    // TODO: Send claim email if humanEmail provided

    return NextResponse.json({
      success: true,
      agentId: agent.id,
      agentToken: agent.agentToken,
      claimUrl,
      message: humanEmail
        ? 'Agent registered. Send the claim URL to your human to complete setup.'
        : 'Agent registered. Purchases over $100 will require account claim.',
      next_steps: [
        'Store your agentToken securely - it cannot be retrieved later',
        'Include X-Agent-Id and X-Agent-Token headers in all API requests',
        'Browse the catalog at GET /api/catalog',
        humanEmail && 'Your human should claim the account at the claimUrl',
      ].filter(Boolean),
    });
  } catch (error) {
    console.error('Agent registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to register agent' 
      },
      { status: 500 }
    );
  }
}
