import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create demo merchant
  const passwordHash = await bcrypt.hash('demo1234', 12);
  
  const merchant = await prisma.user.upsert({
    where: { email: 'demo@texflowmkt.com' },
    update: {},
    create: {
      email: 'demo@texflowmkt.com',
      passwordHash,
      name: 'Demo Merchant',
      businessName: 'Demo Products Inc.',
    },
  });

  console.log('Created merchant:', merchant.email);

  // Create demo products
  const products = [
    {
      name: 'WebScraper Pro API',
      productType: 'API',
      version: '2.1.0',
      priceType: 'usage-based',
      price: 500, // $5 per 1000 requests
      category: 'web-scraping',
      agentAppeal: {
        productIdentity: {
          productName: 'WebScraper Pro API',
          productType: 'API',
          version: '2.1.0',
          maintainer: 'Demo Merchant',
          lastUpdated: new Date().toISOString(),
        },
        clearOutcome: {
          primaryOutcome: 'Extract structured data from any public webpage and return it as clean JSON',
          secondaryOutcomes: ['Handle JavaScript-rendered content', 'Bypass common anti-bot measures'],
          whoBenefits: 'agent',
          failureState: 'Returns error code with specific reason (blocked, timeout, parse_error). No partial data.',
        },
        intendedAgentUse: {
          agentRoleAssumption: 'Research agent, data collection agent, competitive intelligence agent',
          triggerConditions: ['Need to extract data from websites', 'Require structured data from unstructured HTML'],
          decisionContext: 'Agent needs web data but cannot or should not browse manually',
        },
        humanOversight: {
          humanApprovalRequired: false,
          approvalStage: 'none',
          overrideMechanism: 'API key can be revoked by owner',
          auditLogsAvailable: true,
        },
        specifications: {
          inputsRequired: [{ name: 'url', type: 'string', format: 'URL', required: true, description: 'Target webpage URL' }],
          outputsProduced: [{ name: 'data', type: 'object', format: 'JSON', sideEffects: [] }],
          latency: '2-10 seconds',
          throughput: '1000 requests/minute',
          accuracyMetrics: '95% extraction accuracy on standard HTML',
          determinismLevel: 'deterministic',
        },
        successMetrics: {
          primaryMetric: '95% of requests return valid structured data',
          secondaryMetrics: ['Average response time < 5s', 'Less than 1% error rate'],
          baselineVsExpected: 'Manual scraping takes 10x longer',
          confidenceLevel: 90,
          degradationConditions: ['Heavy JavaScript sites may have lower accuracy', 'Rate-limited sites may fail'],
        },
        constraints: {
          hardConstraints: ['Only public webpages', 'Respects robots.txt'],
          softConstraints: ['Best results on English content'],
          prohibitedUses: ['Scraping private/authenticated content', 'DDOS-like request patterns'],
          knownIncompatibilities: ['Does not work with sites requiring CAPTCHA'],
        },
        pricingModel: {
          priceType: 'usage-based',
          currency: 'USD',
          costPerUnit: 500,
          bulkRules: '20% discount for 10K+ requests/month',
          refundPolicy: 'Credits for failed requests',
          whoPays: 'agent_budget',
        },
        integrationSurface: {
          accessMethod: 'API',
          authRequired: true,
          rateLimits: '1000 requests/minute',
          dependencies: [],
          setupTime: 'Instant',
        },
        trustRisk: {
          verificationStatus: 'verified',
          slaGuarantees: '99.5% uptime',
          dataHandlingPolicy: 'Scraped data not stored. Logs retained 30 days.',
          knownFailureModes: ['Target site blocks requests', 'Complex JavaScript rendering fails'],
          worstCaseImpact: 'No data returned, request credits refunded',
          liabilityBoundaries: 'Not liable for accuracy of scraped content',
        },
        reversibility: {
          isReversible: true,
          rollbackWindow: 'N/A - read-only operation',
          sideEffects: ['Target site logs the request'],
          persistenceLevel: 'temporary',
        },
        alternatives: {
          directAlternatives: ['Apify', 'ScrapingBee', 'Scrapy Cloud'],
          whyChooseThis: 'Optimized for AI agent use with structured output',
          tradeoffs: 'Higher cost but better reliability',
        },
        versioningPolicy: {
          updateFrequency: 'Monthly improvements',
          breakingChangePolicy: '30-day notice for breaking changes',
          backwardCompatibility: true,
          deprecationNoticePeriod: '90 days',
        },
        humanSummary: {
          summary: 'WebScraper Pro is a web scraping API that extracts structured data from public webpages. It costs $0.005 per request, has 99.5% uptime, and returns data as clean JSON. Good for research and data collection tasks.',
        },
        agentSummary: {
          intendedOutcome: 'Extract structured data from any public webpage as JSON',
          cost: '$0.005/request',
          riskLevel: 'low',
          approvalRequired: false,
          confidenceScore: 90,
        },
      },
    },
    {
      name: 'TranslateNow API',
      productType: 'API',
      version: '1.5.0',
      priceType: 'usage-based',
      price: 200, // $2 per 1000 characters
      category: 'translation',
      agentAppeal: {
        productIdentity: {
          productName: 'TranslateNow API',
          productType: 'API',
          version: '1.5.0',
          maintainer: 'Demo Merchant',
          lastUpdated: new Date().toISOString(),
        },
        clearOutcome: {
          primaryOutcome: 'Translate text between 50+ languages with 98% accuracy for common language pairs',
          secondaryOutcomes: ['Preserve formatting', 'Detect source language automatically'],
          whoBenefits: 'all',
          failureState: 'Returns original text with unsupported_language error code',
        },
        intendedAgentUse: {
          agentRoleAssumption: 'Communication agent, content agent, research agent',
          triggerConditions: ['Text in foreign language detected', 'User requests translation'],
          decisionContext: 'Agent encounters content in a language the user does not understand',
        },
        humanOversight: {
          humanApprovalRequired: false,
          approvalStage: 'none',
          overrideMechanism: 'API key revocation',
          auditLogsAvailable: true,
        },
        specifications: {
          inputsRequired: [
            { name: 'text', type: 'string', format: 'plain text', required: true, description: 'Text to translate' },
            { name: 'targetLang', type: 'string', format: 'ISO 639-1', required: true, description: 'Target language code' },
          ],
          outputsProduced: [{ name: 'translation', type: 'string', format: 'plain text', sideEffects: [] }],
          latency: '100-500ms',
          throughput: '10000 chars/second',
          accuracyMetrics: '98% for EN-ES-FR-DE, 90%+ for others',
          determinismLevel: 'deterministic',
        },
        successMetrics: {
          primaryMetric: '98% translation accuracy for top 10 language pairs',
          secondaryMetrics: ['Average response < 200ms', 'Zero data loss'],
          baselineVsExpected: 'Comparable to Google Translate',
          confidenceLevel: 95,
          degradationConditions: ['Rare languages may have lower accuracy'],
        },
        constraints: {
          hardConstraints: ['Max 10000 characters per request'],
          softConstraints: ['Best for general text, not technical jargon'],
          prohibitedUses: ['Translating content for malicious purposes'],
          knownIncompatibilities: ['Some RTL languages have formatting issues'],
        },
        pricingModel: {
          priceType: 'usage-based',
          currency: 'USD',
          costPerUnit: 200,
          bulkRules: 'Contact for enterprise pricing',
          refundPolicy: 'Credits for failed translations',
          whoPays: 'agent_budget',
        },
        integrationSurface: {
          accessMethod: 'API',
          authRequired: true,
          rateLimits: '100 requests/minute',
          dependencies: [],
          setupTime: 'Instant',
        },
        trustRisk: {
          verificationStatus: 'verified',
          slaGuarantees: '99.9% uptime',
          dataHandlingPolicy: 'Text not stored. Processing in-memory only.',
          knownFailureModes: ['Rare language pairs may fail'],
          worstCaseImpact: 'Original text returned unchanged',
          liabilityBoundaries: 'Not liable for translation errors in critical applications',
        },
        reversibility: {
          isReversible: true,
          rollbackWindow: 'N/A - stateless',
          sideEffects: [],
          persistenceLevel: 'temporary',
        },
        alternatives: {
          directAlternatives: ['Google Translate API', 'DeepL API', 'Azure Translator'],
          whyChooseThis: 'Better pricing for high volume, optimized for agent workflows',
          tradeoffs: 'Fewer languages than Google, but better pricing',
        },
        versioningPolicy: {
          updateFrequency: 'Quarterly model updates',
          breakingChangePolicy: '60-day notice',
          backwardCompatibility: true,
          deprecationNoticePeriod: '180 days',
        },
        humanSummary: {
          summary: 'TranslateNow translates text between 50+ languages. Costs $0.002 per 1000 characters. 98% accuracy for major languages. Good for general translation needs.',
        },
        agentSummary: {
          intendedOutcome: 'Translate text between 50+ languages',
          cost: '$0.002/1000 chars',
          riskLevel: 'low',
          approvalRequired: false,
          confidenceScore: 95,
        },
      },
    },
    {
      name: 'ImageGen Studio',
      productType: 'Image Generation',
      version: '3.0.0',
      priceType: 'fixed',
      price: 1000, // $10 for 100 images
      category: 'image-generation',
      agentAppeal: {
        productIdentity: {
          productName: 'ImageGen Studio',
          productType: 'Image Generation',
          version: '3.0.0',
          maintainer: 'Demo Merchant',
          lastUpdated: new Date().toISOString(),
        },
        clearOutcome: {
          primaryOutcome: 'Generate high-quality images from text descriptions in under 10 seconds',
          secondaryOutcomes: ['Multiple style options', 'Various resolutions available'],
          whoBenefits: 'human',
          failureState: 'Returns error with reason (content_policy, invalid_prompt, system_error)',
        },
        intendedAgentUse: {
          agentRoleAssumption: 'Creative agent, marketing agent, content agent',
          triggerConditions: ['User needs images for content', 'Visual assets required for project'],
          decisionContext: 'Agent needs to create visual content that does not exist',
        },
        humanOversight: {
          humanApprovalRequired: true,
          approvalStage: 'before_execution',
          overrideMechanism: 'Human can reject generated images',
          auditLogsAvailable: true,
        },
        specifications: {
          inputsRequired: [
            { name: 'prompt', type: 'string', format: 'text', required: true, description: 'Image description' },
            { name: 'style', type: 'string', format: 'enum', required: false, description: 'Art style' },
          ],
          outputsProduced: [{ name: 'imageUrl', type: 'string', format: 'URL', sideEffects: ['Image stored for 24h'] }],
          latency: '5-15 seconds',
          throughput: '10 images/minute',
          accuracyMetrics: 'Subjective - 85% user satisfaction',
          determinismLevel: 'probabilistic',
        },
        successMetrics: {
          primaryMetric: 'Image generated matches prompt intent',
          secondaryMetrics: ['Generation time < 15s', 'No content policy violations'],
          baselineVsExpected: 'Comparable to DALL-E 3',
          confidenceLevel: 85,
          degradationConditions: ['Complex scenes may not render accurately', 'Text in images unreliable'],
        },
        constraints: {
          hardConstraints: ['No NSFW content', 'No real people without consent'],
          softConstraints: ['Best for artistic rather than photorealistic'],
          prohibitedUses: ['Creating deepfakes', 'Generating harmful content'],
          knownIncompatibilities: ['Cannot generate accurate text in images'],
        },
        pricingModel: {
          priceType: 'fixed',
          currency: 'USD',
          costPerUnit: 1000,
          bulkRules: '$10 for 100 images',
          refundPolicy: 'No refunds for generated images',
          whoPays: 'human_account',
        },
        integrationSurface: {
          accessMethod: 'API',
          authRequired: true,
          rateLimits: '10 images/minute',
          dependencies: [],
          setupTime: 'Instant',
        },
        trustRisk: {
          verificationStatus: 'verified',
          slaGuarantees: '99% uptime',
          dataHandlingPolicy: 'Generated images stored 24h then deleted',
          knownFailureModes: ['Content policy rejection', 'Complex prompts fail'],
          worstCaseImpact: 'No image generated, credits not used',
          liabilityBoundaries: 'User responsible for generated content usage',
        },
        reversibility: {
          isReversible: false,
          rollbackWindow: 'N/A',
          sideEffects: ['Image exists and may be cached'],
          persistenceLevel: 'temporary',
        },
        alternatives: {
          directAlternatives: ['DALL-E', 'Midjourney', 'Stable Diffusion'],
          whyChooseThis: 'API-first design, good for automation',
          tradeoffs: 'Less creative control than Midjourney, but easier integration',
        },
        versioningPolicy: {
          updateFrequency: 'Model updates every 3 months',
          breakingChangePolicy: '30-day notice',
          backwardCompatibility: true,
          deprecationNoticePeriod: '90 days',
        },
        humanSummary: {
          summary: 'ImageGen Studio generates images from text prompts. $10 for 100 images. Requires human approval before generation. Good for marketing and content creation.',
        },
        agentSummary: {
          intendedOutcome: 'Generate images from text descriptions',
          cost: '$0.10/image',
          riskLevel: 'medium',
          approvalRequired: true,
          confidenceScore: 85,
        },
      },
    },
  ];

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { id: `demo-${productData.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {
        agentAppeal: JSON.stringify(productData.agentAppeal),
      },
      create: {
        id: `demo-${productData.name.toLowerCase().replace(/\s+/g, '-')}`,
        sellerId: merchant.id,
        name: productData.name,
        productType: productData.productType,
        version: productData.version,
        priceType: productData.priceType,
        price: productData.price,
        currency: 'USD',
        agentAppeal: JSON.stringify(productData.agentAppeal),
        category: productData.category,
        tags: JSON.stringify([]),
        status: 'live',
      },
    });

    console.log('Created product:', product.name);
  }

  // Create categories
  const categories = [
    { name: 'APIs', slug: 'apis', description: 'Programmatic interfaces and endpoints' },
    { name: 'Web Scraping', slug: 'web-scraping', description: 'Data extraction tools' },
    { name: 'Translation', slug: 'translation', description: 'Language translation services' },
    { name: 'Image Generation', slug: 'image-generation', description: 'AI image creation' },
    { name: 'Data Processing', slug: 'data-processing', description: 'Data transformation' },
    { name: 'Automation', slug: 'automation', description: 'Workflow automation' },
    { name: 'AI Models', slug: 'ai-models', description: 'Trained models' },
    { name: 'Datasets', slug: 'datasets', description: 'Curated data' },
    { name: 'Integrations', slug: 'integrations', description: 'Service connectors' },
    { name: 'Utilities', slug: 'utilities', description: 'General tools' },
  ];

  for (let i = 0; i < categories.length; i++) {
    await prisma.category.upsert({
      where: { slug: categories[i].slug },
      update: {},
      create: {
        ...categories[i],
        orderIndex: i,
      },
    });
  }

  console.log('Created categories');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
