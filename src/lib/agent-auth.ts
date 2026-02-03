import { NextRequest, NextResponse } from 'next/server';
import { prisma } from './db';

export interface AgentContext {
  agentId: string;
  agentName: string;
  claimed: boolean;
  budgetLimit: number | null;
}

export async function authenticateAgent(request: NextRequest): Promise<AgentContext | NextResponse> {
  const agentId = request.headers.get('X-Agent-Id');
  const agentToken = request.headers.get('X-Agent-Token');

  if (!agentId || !agentToken) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Missing authentication headers. Include X-Agent-Id and X-Agent-Token.',
        docs: '/.well-known/ai-actions.json'
      },
      { status: 401 }
    );
  }

  const agent = await prisma.agent.findUnique({
    where: { id: agentId },
  });

  if (!agent) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Agent not found. Register at POST /api/agent/register.' 
      },
      { status: 401 }
    );
  }

  if (agent.agentToken !== agentToken) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid agent token.' 
      },
      { status: 401 }
    );
  }

  // Update last active
  await prisma.agent.update({
    where: { id: agentId },
    data: { lastActive: new Date() },
  });

  return {
    agentId: agent.id,
    agentName: agent.agentName,
    claimed: agent.claimed,
    budgetLimit: agent.budgetLimit,
  };
}

export function isAgentContext(result: AgentContext | NextResponse): result is AgentContext {
  return 'agentId' in result;
}
