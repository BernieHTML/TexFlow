// ===========================
// Agent Appeal Types (15 Sections)
// ===========================

export interface ProductIdentity {
  productName: string;
  productType: ProductType;
  version: string;
  maintainer: string;
  lastUpdated: string;
}

export type ProductType = 
  | 'API'
  | 'Dataset'
  | 'Automation'
  | 'SaaS Tool'
  | 'Prompt Pack'
  | 'Model'
  | 'Plugin'
  | 'Web Scraping'
  | 'Translation'
  | 'Image Generation'
  | 'Other';

export interface ClearOutcome {
  primaryOutcome: string;
  secondaryOutcomes: string[];
  whoBenefits: 'agent' | 'human' | 'system' | 'all';
  failureState: string;
}

export interface IntendedAgentUse {
  agentRoleAssumption: string;
  triggerConditions: string[];
  decisionContext: string;
}

export interface HumanOversight {
  humanApprovalRequired: boolean;
  approvalStage: 'before_purchase' | 'before_execution' | 'after_execution' | 'none';
  overrideMechanism: string;
  auditLogsAvailable: boolean;
}

export interface Specifications {
  inputsRequired: InputSpec[];
  outputsProduced: OutputSpec[];
  latency: string;
  throughput: string;
  accuracyMetrics: string;
  determinismLevel: 'deterministic' | 'probabilistic' | 'hybrid';
}

export interface InputSpec {
  name: string;
  type: string;
  format: string;
  required: boolean;
  description: string;
}

export interface OutputSpec {
  name: string;
  type: string;
  format: string;
  sideEffects: string[];
}

export interface SuccessMetrics {
  primaryMetric: string;
  secondaryMetrics: string[];
  baselineVsExpected: string;
  confidenceLevel: number; // 0-100
  degradationConditions: string[];
}

export interface Constraints {
  hardConstraints: string[];
  softConstraints: string[];
  prohibitedUses: string[];
  knownIncompatibilities: string[];
}

export interface PricingModel {
  priceType: 'free' | 'fixed' | 'usage-based' | 'subscription' | 'negotiable';
  currency: string;
  costPerUnit: number;
  bulkRules: string;
  refundPolicy: string;
  whoPays: 'agent_budget' | 'human_account';
}

export interface IntegrationSurface {
  accessMethod: 'API' | 'SDK' | 'Webhook' | 'File Upload' | 'UI-only' | 'Multiple';
  authRequired: boolean;
  rateLimits: string;
  dependencies: string[];
  setupTime: string;
}

export interface TrustRisk {
  verificationStatus: 'verified' | 'unverified' | 'pending';
  slaGuarantees: string;
  dataHandlingPolicy: string;
  knownFailureModes: string[];
  worstCaseImpact: string;
  liabilityBoundaries: string;
}

export interface Reversibility {
  isReversible: boolean;
  rollbackWindow: string;
  sideEffects: string[];
  persistenceLevel: 'temporary' | 'permanent';
}

export interface Alternatives {
  directAlternatives: string[];
  whyChooseThis: string;
  tradeoffs: string;
}

export interface VersioningPolicy {
  updateFrequency: string;
  breakingChangePolicy: string;
  backwardCompatibility: boolean;
  deprecationNoticePeriod: string;
}

export interface HumanSummary {
  summary: string;
}

export interface AgentSummary {
  intendedOutcome: string;
  cost: string;
  riskLevel: 'low' | 'medium' | 'high';
  approvalRequired: boolean;
  confidenceScore: number; // 0-100
}

// Complete Agent Appeal structure
export interface AgentAppeal {
  productIdentity: ProductIdentity;
  clearOutcome: ClearOutcome;
  intendedAgentUse: IntendedAgentUse;
  humanOversight: HumanOversight;
  specifications: Specifications;
  successMetrics: SuccessMetrics;
  constraints: Constraints;
  pricingModel: PricingModel;
  integrationSurface: IntegrationSurface;
  trustRisk: TrustRisk;
  reversibility: Reversibility;
  alternatives: Alternatives;
  versioningPolicy: VersioningPolicy;
  humanSummary: HumanSummary;
  agentSummary: AgentSummary;
}

// ===========================
// Database Model Types
// ===========================

export interface User {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  stripeAccountId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Agent {
  id: string;
  agentName: string;
  agentToken: string;
  humanOwnerId?: string;
  humanEmail?: string;
  claimed: boolean;
  capabilities: string[];
  budgetLimit?: number;
  createdAt: Date;
  lastActive?: Date;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  productType: ProductType;
  version: string;
  priceType: string;
  price: number;
  currency: string;
  agentAppeal: AgentAppeal;
  category: string;
  tags: string[];
  status: 'draft' | 'live' | 'paused' | 'archived';
  views: number;
  purchases: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  productId: string;
  sellerId: string;
  agentId: string;
  grossAmount: number;
  platformFee: number;
  sellerAmount: number;
  currency: string;
  stripePaymentId?: string;
  stripeStatus?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  completedAt?: Date;
}

// ===========================
// API Types
// ===========================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CatalogQuery {
  category?: string;
  productType?: ProductType;
  priceMax?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CatalogItem {
  id: string;
  name: string;
  productType: ProductType;
  category: string;
  price: number;
  currency: string;
  agentSummary: AgentSummary;
  intendedOutcome: string;
  triggerConditions: string[];
}

export interface ProductDetail {
  id: string;
  agentAppeal: AgentAppeal;
  purchaseEndpoint: string;
}

export interface PurchaseRequest {
  productId: string;
  agentId: string;
  agentToken: string;
  humanApproved?: boolean;
  paymentMethodId?: string;
}

export interface PurchaseResponse {
  success: boolean;
  transactionId?: string;
  accessCredentials?: Record<string, string>;
  deliveryInstructions?: string;
  error?: string;
}

// ===========================
// Wizard Types
// ===========================

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  section: keyof AgentAppeal;
  questions: WizardQuestion[];
}

export interface WizardQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'number' | 'boolean' | 'list';
  options?: string[];
  placeholder?: string;
  required: boolean;
  aiAssisted?: boolean;
}

export interface WizardState {
  currentStep: number;
  answers: Record<string, unknown>;
  generatedAppeal: Partial<AgentAppeal>;
}
