import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const products = await prisma.product.findMany({
      where: { sellerId: session.userId },
      orderBy: { createdAt: 'desc' },
    });

    // Parse JSON fields
    const parsedProducts = products.map(p => ({
      ...p,
      agentAppeal: JSON.parse(p.agentAppeal),
      tags: JSON.parse(p.tags),
    }));

    return NextResponse.json({ products: parsedProducts });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Build the Agent Appeal structure from form data
    const agentAppeal = {
      productIdentity: {
        productName: body.productName,
        productType: body.productType,
        version: body.version,
        maintainer: session.name,
        lastUpdated: new Date().toISOString(),
      },
      clearOutcome: {
        primaryOutcome: body.primaryOutcome,
        secondaryOutcomes: body.secondaryOutcomes?.filter(Boolean) || [],
        whoBenefits: body.whoBenefits,
        failureState: body.failureState,
      },
      intendedAgentUse: {
        agentRoleAssumption: body.agentRoleAssumption,
        triggerConditions: body.triggerConditions?.filter(Boolean) || [],
        decisionContext: body.decisionContext,
      },
      humanOversight: {
        humanApprovalRequired: body.humanApprovalRequired,
        approvalStage: body.approvalStage,
        overrideMechanism: body.overrideMechanism,
        auditLogsAvailable: body.auditLogsAvailable,
      },
      specifications: {
        inputsRequired: body.inputsRequired || [],
        outputsProduced: body.outputsProduced || [],
        latency: body.latency,
        throughput: body.throughput,
        accuracyMetrics: body.accuracyMetrics,
        determinismLevel: body.determinismLevel,
      },
      successMetrics: {
        primaryMetric: body.primaryMetric,
        secondaryMetrics: body.secondaryMetrics?.filter(Boolean) || [],
        baselineVsExpected: body.baselineVsExpected,
        confidenceLevel: body.confidenceLevel,
        degradationConditions: body.degradationConditions?.filter(Boolean) || [],
      },
      constraints: {
        hardConstraints: body.hardConstraints?.filter(Boolean) || [],
        softConstraints: body.softConstraints?.filter(Boolean) || [],
        prohibitedUses: body.prohibitedUses?.filter(Boolean) || [],
        knownIncompatibilities: body.knownIncompatibilities?.filter(Boolean) || [],
      },
      pricingModel: {
        priceType: body.priceType,
        currency: body.currency,
        costPerUnit: body.price,
        bulkRules: body.bulkRules,
        refundPolicy: body.refundPolicy,
        whoPays: body.whoPays,
      },
      integrationSurface: {
        accessMethod: body.accessMethod,
        authRequired: body.authRequired,
        rateLimits: body.rateLimits,
        dependencies: body.dependencies?.filter(Boolean) || [],
        setupTime: body.setupTime,
      },
      trustRisk: {
        verificationStatus: body.verificationStatus,
        slaGuarantees: body.slaGuarantees,
        dataHandlingPolicy: body.dataHandlingPolicy,
        knownFailureModes: body.knownFailureModes?.filter(Boolean) || [],
        worstCaseImpact: body.worstCaseImpact,
        liabilityBoundaries: body.liabilityBoundaries,
      },
      reversibility: {
        isReversible: body.isReversible,
        rollbackWindow: body.rollbackWindow,
        sideEffects: body.sideEffects?.filter(Boolean) || [],
        persistenceLevel: body.persistenceLevel,
      },
      alternatives: {
        directAlternatives: body.directAlternatives?.filter(Boolean) || [],
        whyChooseThis: body.whyChooseThis,
        tradeoffs: body.tradeoffs,
      },
      versioningPolicy: {
        updateFrequency: body.updateFrequency,
        breakingChangePolicy: body.breakingChangePolicy,
        backwardCompatibility: body.backwardCompatibility,
        deprecationNoticePeriod: body.deprecationNoticePeriod,
      },
      humanSummary: {
        summary: body.humanSummary,
      },
      agentSummary: {
        intendedOutcome: body.primaryOutcome,
        cost: body.priceType === 'free' ? 'Free' : `${body.price / 100} ${body.currency}`,
        riskLevel: body.agentSummary?.riskLevel || 'low',
        approvalRequired: body.humanApprovalRequired,
        confidenceScore: body.confidenceLevel,
      },
    };

    const product = await prisma.product.create({
      data: {
        sellerId: session.userId,
        name: body.productName,
        productType: body.productType,
        version: body.version,
        priceType: body.priceType,
        price: body.price || 0,
        currency: body.currency || 'USD',
        agentAppeal: JSON.stringify(agentAppeal),
        category: body.category || 'utilities',
        tags: JSON.stringify(body.tags?.filter(Boolean) || []),
        status: 'live', // Publish immediately
      },
    });

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        agentAppeal,
        tags: body.tags?.filter(Boolean) || [],
      },
    });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
