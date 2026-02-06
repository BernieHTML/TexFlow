import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

// AI-assisted generation for the wizard
// Uses OpenAI when API key is available, otherwise provides smart defaults
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { section, currentData } = await request.json();

    // If OpenAI API key is available, use it
    if (process.env.OPENAI_API_KEY) {
      try {
        const OpenAI = (await import('openai')).default;
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const prompt = generatePrompt(section, currentData);
        
        const completion = await openai.chat.completions.create({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: `You are an expert at creating product listings optimized for AI agent discovery and purchase. 
              Your goal is to help merchants describe their products in a way that AI agents can easily understand, 
              evaluate, and act upon. Be specific, measurable, and avoid vague marketing language.
              Respond with JSON only, no markdown.`,
            },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          max_tokens: 1000,
        });

        const content = completion.choices[0].message.content;
        if (content) {
          const suggestions = JSON.parse(content);
          return NextResponse.json({ suggestions });
        }
      } catch (aiError) {
        console.error('AI generation error:', aiError);
        // Fall through to smart defaults
      }
    }

    // Smart defaults based on product info
    const suggestions = generateSmartDefaults(section, currentData);
    return NextResponse.json({ suggestions });

  } catch (error) {
    console.error('Wizard generate error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}

function generatePrompt(section: string, data: Record<string, any>): string {
  const productName = data.productName || 'this product';
  const productType = data.productType || 'digital product';

  switch (section) {
    case 'outcome':
      return `For a ${productType} called "${productName}", generate:
      1. primaryOutcome: A single, specific sentence describing what changes in the world when an AI agent uses this product. Must be observable, measurable, and verifiable.
      2. secondaryOutcomes: Array of 2-3 additional outcomes, ordered by likelihood.
      3. failureState: A specific description of what "not working" looks like.
      
      Return as JSON: { "primaryOutcome": "...", "secondaryOutcomes": ["...", "..."], "failureState": "..." }`;

    case 'summaries':
      return `Based on this product data: ${JSON.stringify(data)}
      
      Generate:
      1. humanSummary: A plain-language paragraph (2-3 sentences) that a human can read to sanity-check an agent's decision. No jargon, no hype, just reality.
      
      Return as JSON: { "humanSummary": "..." }`;

    default:
      return `Generate helpful content for the "${section}" section of a ${productType} called "${productName}".`;
  }
}

function generateSmartDefaults(section: string, data: Record<string, any>): Record<string, any> {
  const productName = data.productName || 'Product';
  const productType = data.productType || 'service';

  switch (section) {
    case 'outcome':
      return {
        primaryOutcome: `Successfully executes ${productType.toLowerCase()} operations and returns structured results within specified parameters.`,
        secondaryOutcomes: [
          'Provides detailed logs and status information',
          'Handles edge cases gracefully with clear error messages'
        ],
        failureState: `Returns error response with specific failure reason, no partial or corrupted data is produced.`,
      };

    case 'summaries':
      const priceStr = data.priceType === 'free' ? 'free' : `$${(data.price / 100).toFixed(2)}`;
      return {
        humanSummary: `${productName} is a ${productType.toLowerCase()} that ${data.primaryOutcome || 'provides digital services'}. ` +
          `It costs ${priceStr} per use and ${data.humanApprovalRequired ? 'requires' : 'does not require'} human approval. ` +
          `The service is ${data.isReversible ? 'reversible' : 'not reversible'} and has ${data.verificationStatus || 'unverified'} status.`,
      };

    default:
      return {};
  }
}
