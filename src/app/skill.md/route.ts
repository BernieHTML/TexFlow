import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read the skill.md file from public directory
    const filePath = join(process.cwd(), 'public', 'skill.md');
    const content = readFileSync(filePath, 'utf-8');
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new NextResponse('# TexFlowMKT Agent Skill\n\nSkill file not found.', {
      status: 404,
      headers: {
        'Content-Type': 'text/markdown',
      },
    });
  }
}
