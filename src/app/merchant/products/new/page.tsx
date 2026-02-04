'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles,
  Package,
  Target,
  Bot,
  Shield,
  Settings,
  BarChart3,
  AlertTriangle,
  DollarSign,
  Plug,
  Lock,
  RotateCcw,
  GitCompare,
  History,
  FileText,
  Cpu
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Navigation from '@/components/shared/Navigation';
import { PRODUCT_TYPES, CATEGORIES } from '@/lib/utils';

// Wizard steps configuration
const WIZARD_STEPS = [
  { id: 'identity', title: 'Product Identity', icon: Package, description: 'Basic product information' },
  { id: 'outcome', title: 'Clear Outcome', icon: Target, description: 'What does your product achieve?' },
  { id: 'agent-use', title: 'Agent Use', icon: Bot, description: 'How should agents use this?' },
  { id: 'oversight', title: 'Human Oversight', icon: Shield, description: 'Control and approval settings' },
  { id: 'specs', title: 'Specifications', icon: Settings, description: 'Technical details' },
  { id: 'metrics', title: 'Success Metrics', icon: BarChart3, description: 'How to measure success' },
  { id: 'constraints', title: 'Constraints', icon: AlertTriangle, description: 'Limits and boundaries' },
  { id: 'pricing', title: 'Pricing', icon: DollarSign, description: 'Economic model' },
  { id: 'integration', title: 'Integration', icon: Plug, description: 'How to access the product' },
  { id: 'trust', title: 'Trust & Risk', icon: Lock, description: 'Verification and guarantees' },
  { id: 'reversibility', title: 'Reversibility', icon: RotateCcw, description: 'Can actions be undone?' },
  { id: 'alternatives', title: 'Alternatives', icon: GitCompare, description: 'Comparison with others' },
  { id: 'versioning', title: 'Versioning', icon: History, description: 'Update policies' },
  { id: 'summaries', title: 'Summaries', icon: FileText, description: 'Human & agent summaries' },
  { id: 'review', title: 'Review & Publish', icon: Cpu, description: 'Final review' },
];

export default function NewProductWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    // Product Identity
    productName: '',
    productType: '',
    version: '1.0.0',
    
    // Clear Outcome
    primaryOutcome: '',
    secondaryOutcomes: [''],
    whoBenefits: 'all',
    failureState: '',
    
    // Agent Use
    agentRoleAssumption: '',
    triggerConditions: [''],
    decisionContext: '',
    
    // Human Oversight
    humanApprovalRequired: false,
    approvalStage: 'none',
    overrideMechanism: '',
    auditLogsAvailable: true,
    
    // Specifications
    inputsRequired: [{ name: '', type: '', format: '', required: true, description: '' }],
    outputsProduced: [{ name: '', type: '', format: '', sideEffects: [] }],
    latency: '',
    throughput: '',
    accuracyMetrics: '',
    determinismLevel: 'deterministic',
    
    // Success Metrics
    primaryMetric: '',
    secondaryMetrics: [''],
    baselineVsExpected: '',
    confidenceLevel: 80,
    degradationConditions: [''],
    
    // Constraints
    hardConstraints: [''],
    softConstraints: [''],
    prohibitedUses: [''],
    knownIncompatibilities: [''],
    
    // Pricing
    priceType: 'fixed',
    currency: 'USD',
    price: 0,
    bulkRules: '',
    refundPolicy: '',
    whoPays: 'human_account',
    
    // Integration
    accessMethod: 'API',
    authRequired: true,
    rateLimits: '',
    dependencies: [''],
    setupTime: '',
    
    // Trust & Risk
    verificationStatus: 'unverified',
    slaGuarantees: '',
    dataHandlingPolicy: '',
    knownFailureModes: [''],
    worstCaseImpact: '',
    liabilityBoundaries: '',
    
    // Reversibility
    isReversible: true,
    rollbackWindow: '',
    sideEffects: [''],
    persistenceLevel: 'temporary',
    
    // Alternatives
    directAlternatives: [''],
    whyChooseThis: '',
    tradeoffs: '',
    
    // Versioning
    updateFrequency: '',
    breakingChangePolicy: '',
    backwardCompatibility: true,
    deprecationNoticePeriod: '',
    
    // Summaries
    humanSummary: '',
    agentSummary: {
      intendedOutcome: '',
      cost: '',
      riskLevel: 'low',
      approvalRequired: false,
      confidenceScore: 80,
    },
    
    // Category
    category: '',
    tags: [''],
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const arr = [...(prev[field] || [])];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field: string, defaultValue: any = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultValue],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index),
    }));
  };

  const generateWithAI = async (section: string) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/wizard/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, currentData: formData }),
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.suggestions) {
          setFormData(prev => ({ ...prev, ...data.suggestions }));
        }
      }
    } catch (error) {
      console.error('AI generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        const data = await res.json();
        router.push(`/merchant/products/${data.product.id}?created=true`);
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (WIZARD_STEPS[currentStep].id) {
      case 'identity':
        return formData.productName && formData.productType;
      case 'outcome':
        return formData.primaryOutcome && formData.failureState;
      case 'pricing':
        return formData.priceType && (formData.priceType === 'free' || formData.price > 0);
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    const step = WIZARD_STEPS[currentStep];
    
    switch (step.id) {
      case 'identity':
        return (
          <div className="space-y-6">
            <Input
              label="Product Name"
              placeholder="e.g., WebScraper Pro API"
              value={formData.productName}
              onChange={(e) => updateField('productName', e.target.value)}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Type
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                value={formData.productType}
                onChange={(e) => updateField('productType', e.target.value)}
                required
              >
                <option value="">Select a type...</option>
                {PRODUCT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <Input
              label="Version"
              placeholder="1.0.0"
              value={formData.version}
              onChange={(e) => updateField('version', e.target.value)}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
              >
                <option value="">Select a category...</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        );
        
      case 'outcome':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Primary Outcome (1 sentence, deterministic)
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => generateWithAI('outcome')}
                disabled={isGenerating || !formData.productName}
              >
                <Sparkles className="w-4 h-4 mr-1" />
                {isGenerating ? 'Generating...' : 'AI Assist'}
              </Button>
            </div>
            <textarea
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 min-h-[80px]"
              placeholder="If an agent uses this product, what changes in the world? Be specific and measurable."
              value={formData.primaryOutcome}
              onChange={(e) => updateField('primaryOutcome', e.target.value)}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secondary Outcomes (optional)
              </label>
              {formData.secondaryOutcomes.map((outcome: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Additional outcome..."
                    value={outcome}
                    onChange={(e) => updateArrayField('secondaryOutcomes', i, e.target.value)}
                  />
                  {i > 0 && (
                    <Button variant="ghost" onClick={() => removeArrayItem('secondaryOutcomes', i)}>×</Button>
                  )}
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => addArrayItem('secondaryOutcomes')}>
                + Add Outcome
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Who Benefits?
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                value={formData.whoBenefits}
                onChange={(e) => updateField('whoBenefits', e.target.value)}
              >
                <option value="agent">Agent</option>
                <option value="human">Human</option>
                <option value="system">System</option>
                <option value="all">All</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Failure State
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                placeholder="What does 'not working' look like? Be specific."
                value={formData.failureState}
                onChange={(e) => updateField('failureState', e.target.value)}
              />
            </div>
          </div>
        );
        
      case 'agent-use':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Agent Role Assumption
              </label>
              <Input
                placeholder="e.g., shopping agent, research agent, ops agent"
                value={formData.agentRoleAssumption}
                onChange={(e) => updateField('agentRoleAssumption', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">What type of agent should use this?</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trigger Conditions
              </label>
              {formData.triggerConditions.map((condition: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input
                    placeholder="When should an agent consider this product?"
                    value={condition}
                    onChange={(e) => updateArrayField('triggerConditions', i, e.target.value)}
                  />
                  {i > 0 && (
                    <Button variant="ghost" onClick={() => removeArrayItem('triggerConditions', i)}>×</Button>
                  )}
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => addArrayItem('triggerConditions')}>
                + Add Condition
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Decision Context
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                placeholder="What problem is the agent trying to solve when they find this?"
                value={formData.decisionContext}
                onChange={(e) => updateField('decisionContext', e.target.value)}
              />
            </div>
          </div>
        );
        
      case 'oversight':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Human Approval Required?</div>
                <div className="text-sm text-gray-500">Should agents ask their humans before acting?</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.humanApprovalRequired}
                  onChange={(e) => updateField('humanApprovalRequired', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            {formData.humanApprovalRequired && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  At What Stage?
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                  value={formData.approvalStage}
                  onChange={(e) => updateField('approvalStage', e.target.value)}
                >
                  <option value="before_purchase">Before Purchase</option>
                  <option value="before_execution">Before Execution</option>
                  <option value="after_execution">After Execution</option>
                </select>
              </div>
            )}
            
            <Input
              label="Override Mechanism"
              placeholder="How can humans override agent actions?"
              value={formData.overrideMechanism}
              onChange={(e) => updateField('overrideMechanism', e.target.value)}
            />
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Audit Logs Available?</div>
                <div className="text-sm text-gray-500">Can actions be reviewed later?</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.auditLogsAvailable}
                  onChange={(e) => updateField('auditLogsAvailable', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        );
        
      case 'specs':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Latency / Time to Result
              </label>
              <Input
                placeholder="e.g., &lt;100ms, 1-5 seconds, real-time"
                value={formData.latency}
                onChange={(e) => updateField('latency', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Throughput / Limits
              </label>
              <Input
                placeholder="e.g., 1000 requests/minute, unlimited"
                value={formData.throughput}
                onChange={(e) => updateField('throughput', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accuracy / Reliability Metrics
              </label>
              <Input
                placeholder="e.g., 99.5% accuracy, 99.9% uptime"
                value={formData.accuracyMetrics}
                onChange={(e) => updateField('accuracyMetrics', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Determinism Level
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                value={formData.determinismLevel}
                onChange={(e) => updateField('determinismLevel', e.target.value)}
              >
                <option value="deterministic">Deterministic (same input = same output)</option>
                <option value="probabilistic">Probabilistic (may vary)</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        );
        
      case 'metrics':
        return (
          <div className="space-y-6">
            <Input
              label="Primary Success Metric"
              placeholder="e.g., 95% of requests return valid data"
              value={formData.primaryMetric}
              onChange={(e) => updateField('primaryMetric', e.target.value)}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confidence Level (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.confidenceLevel}
                onChange={(e) => updateField('confidenceLevel', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">{formData.confidenceLevel}%</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Known Degradation Conditions
              </label>
              {formData.degradationConditions.map((condition: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input
                    placeholder="When does performance degrade?"
                    value={condition}
                    onChange={(e) => updateArrayField('degradationConditions', i, e.target.value)}
                  />
                  {i > 0 && (
                    <Button variant="ghost" onClick={() => removeArrayItem('degradationConditions', i)}>×</Button>
                  )}
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => addArrayItem('degradationConditions')}>
                + Add Condition
              </Button>
            </div>
          </div>
        );
        
      case 'constraints':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hard Constraints (Non-negotiable)
              </label>
              {formData.hardConstraints.map((constraint: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input
                    placeholder="e.g., US only, max $100/transaction"
                    value={constraint}
                    onChange={(e) => updateArrayField('hardConstraints', i, e.target.value)}
                  />
                  {i > 0 && (
                    <Button variant="ghost" onClick={() => removeArrayItem('hardConstraints', i)}>×</Button>
                  )}
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => addArrayItem('hardConstraints')}>
                + Add Constraint
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prohibited Uses
              </label>
              {formData.prohibitedUses.map((use: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input
                    placeholder="What must this NOT be used for?"
                    value={use}
                    onChange={(e) => updateArrayField('prohibitedUses', i, e.target.value)}
                  />
                  {i > 0 && (
                    <Button variant="ghost" onClick={() => removeArrayItem('prohibitedUses', i)}>×</Button>
                  )}
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => addArrayItem('prohibitedUses')}>
                + Add Prohibition
              </Button>
            </div>
          </div>
        );
        
      case 'pricing':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Type
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                value={formData.priceType}
                onChange={(e) => updateField('priceType', e.target.value)}
              >
                <option value="free">Free</option>
                <option value="fixed">Fixed Price</option>
                <option value="usage-based">Usage-Based</option>
                <option value="subscription">Subscription</option>
              </select>
            </div>
            
            {formData.priceType !== 'free' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Price (in cents)"
                    type="number"
                    placeholder="1000 = $10.00"
                    value={formData.price}
                    onChange={(e) => updateField('price', parseInt(e.target.value) || 0)}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Currency
                    </label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                      value={formData.currency}
                      onChange={(e) => updateField('currency', e.target.value)}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
                
                <Input
                  label="Bulk/Volume Rules"
                  placeholder="e.g., 20% off for 100+ units"
                  value={formData.bulkRules}
                  onChange={(e) => updateField('bulkRules', e.target.value)}
                />
                
                <Input
                  label="Refund Policy"
                  placeholder="e.g., Full refund within 24h if service fails"
                  value={formData.refundPolicy}
                  onChange={(e) => updateField('refundPolicy', e.target.value)}
                />
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Who Pays?
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                value={formData.whoPays}
                onChange={(e) => updateField('whoPays', e.target.value)}
              >
                <option value="human_account">Human Account</option>
                <option value="agent_budget">Agent Budget</option>
              </select>
            </div>
            
            <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Platform Fee:</strong> TexFlowMKT takes 5% of each transaction. 
                You receive 95% of the sale price.
              </p>
            </Card>
          </div>
        );
        
      case 'integration':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Access Method
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                value={formData.accessMethod}
                onChange={(e) => updateField('accessMethod', e.target.value)}
              >
                <option value="API">API</option>
                <option value="SDK">SDK</option>
                <option value="Webhook">Webhook</option>
                <option value="File Upload">File Upload</option>
                <option value="Multiple">Multiple Methods</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Authentication Required?</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.authRequired}
                  onChange={(e) => updateField('authRequired', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <Input
              label="Rate Limits"
              placeholder="e.g., 100 requests/minute"
              value={formData.rateLimits}
              onChange={(e) => updateField('rateLimits', e.target.value)}
            />
            
            <Input
              label="Setup Time"
              placeholder="e.g., Instant, 5 minutes, 1 hour"
              value={formData.setupTime}
              onChange={(e) => updateField('setupTime', e.target.value)}
            />
          </div>
        );
        
      case 'trust':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Verification Status
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                value={formData.verificationStatus}
                onChange={(e) => updateField('verificationStatus', e.target.value)}
              >
                <option value="unverified">Unverified</option>
                <option value="pending">Pending Verification</option>
                <option value="verified">Verified</option>
              </select>
            </div>
            
            <Input
              label="SLA Guarantees"
              placeholder="e.g., 99.9% uptime, 24h support response"
              value={formData.slaGuarantees}
              onChange={(e) => updateField('slaGuarantees', e.target.value)}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Handling Policy
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                placeholder="How is data stored, processed, and deleted?"
                value={formData.dataHandlingPolicy}
                onChange={(e) => updateField('dataHandlingPolicy', e.target.value)}
              />
            </div>
            
            <Input
              label="Worst-Case Impact"
              placeholder="What's the worst that could happen if this fails?"
              value={formData.worstCaseImpact}
              onChange={(e) => updateField('worstCaseImpact', e.target.value)}
            />
          </div>
        );
        
      case 'reversibility':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Is the Action Reversible?</div>
                <div className="text-sm text-gray-500">Can mistakes be undone?</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.isReversible}
                  onChange={(e) => updateField('isReversible', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            {formData.isReversible && (
              <Input
                label="Rollback Window"
                placeholder="e.g., 24 hours, 7 days, unlimited"
                value={formData.rollbackWindow}
                onChange={(e) => updateField('rollbackWindow', e.target.value)}
              />
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Persistence Level
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                value={formData.persistenceLevel}
                onChange={(e) => updateField('persistenceLevel', e.target.value)}
              >
                <option value="temporary">Temporary</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>
          </div>
        );
        
      case 'alternatives':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Direct Alternatives
              </label>
              {formData.directAlternatives.map((alt: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Name a competing product"
                    value={alt}
                    onChange={(e) => updateArrayField('directAlternatives', i, e.target.value)}
                  />
                  {i > 0 && (
                    <Button variant="ghost" onClick={() => removeArrayItem('directAlternatives', i)}>×</Button>
                  )}
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => addArrayItem('directAlternatives')}>
                + Add Alternative
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Why Choose This Instead?
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                placeholder="What makes your product better?"
                value={formData.whyChooseThis}
                onChange={(e) => updateField('whyChooseThis', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trade-offs
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                placeholder="Be honest about disadvantages"
                value={formData.tradeoffs}
                onChange={(e) => updateField('tradeoffs', e.target.value)}
              />
            </div>
          </div>
        );
        
      case 'versioning':
        return (
          <div className="space-y-6">
            <Input
              label="Update Frequency"
              placeholder="e.g., Weekly, Monthly, As needed"
              value={formData.updateFrequency}
              onChange={(e) => updateField('updateFrequency', e.target.value)}
            />
            
            <Input
              label="Breaking Change Policy"
              placeholder="How do you handle breaking changes?"
              value={formData.breakingChangePolicy}
              onChange={(e) => updateField('breakingChangePolicy', e.target.value)}
            />
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Backward Compatibility</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.backwardCompatibility}
                  onChange={(e) => updateField('backwardCompatibility', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <Input
              label="Deprecation Notice Period"
              placeholder="e.g., 30 days, 90 days"
              value={formData.deprecationNoticePeriod}
              onChange={(e) => updateField('deprecationNoticePeriod', e.target.value)}
            />
          </div>
        );
        
      case 'summaries':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Human Summary
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => generateWithAI('summaries')}
                disabled={isGenerating}
              >
                <Sparkles className="w-4 h-4 mr-1" />
                {isGenerating ? 'Generating...' : 'Auto-Generate'}
              </Button>
            </div>
            <textarea
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 min-h-[100px]"
              placeholder="One paragraph a human can read to sanity-check. No jargon, no hype, just reality."
              value={formData.humanSummary}
              onChange={(e) => updateField('humanSummary', e.target.value)}
            />
            
            <Card className="p-4 bg-gray-50 dark:bg-slate-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Agent Summary (Auto-calculated)</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Intended Outcome:</span>
                  <p className="text-gray-900 dark:text-white">{formData.primaryOutcome || 'Not set'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Cost:</span>
                  <p className="text-gray-900 dark:text-white">
                    {formData.priceType === 'free' ? 'Free' : `$${(formData.price / 100).toFixed(2)} ${formData.currency}`}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Risk Level:</span>
                  <select
                    className="mt-1 w-full px-2 py-1 border rounded bg-white dark:bg-slate-600 text-sm"
                    value={formData.agentSummary.riskLevel}
                    onChange={(e) => updateField('agentSummary', { ...formData.agentSummary, riskLevel: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <span className="text-gray-500">Approval Required:</span>
                  <p className="text-gray-900 dark:text-white">{formData.humanApprovalRequired ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </Card>
          </div>
        );
        
      case 'review':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Review Your Product
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Product Name</span>
                  <span className="font-medium">{formData.productName}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Type</span>
                  <span>{formData.productType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Price</span>
                  <span>{formData.priceType === 'free' ? 'Free' : `$${(formData.price / 100).toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Human Approval</span>
                  <span>{formData.humanApprovalRequired ? 'Required' : 'Not Required'}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Reversible</span>
                  <span>{formData.isReversible ? 'Yes' : 'No'}</span>
                </div>
                <div className="py-2">
                  <span className="text-gray-500">Primary Outcome</span>
                  <p className="mt-1">{formData.primaryOutcome}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 dark:text-green-300 font-medium">
                  Ready to publish! Your product will be live immediately.
                </span>
              </div>
            </Card>
          </div>
        );
        
      default:
        return <div>Step not implemented</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation variant="dark" />
      
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 md:top-20 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/merchant/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <Store className="w-6 h-6 text-primary-600" />
              <span className="font-semibold text-gray-900 dark:text-white">New Product</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {WIZARD_STEPS.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / WIZARD_STEPS.length) * 100)}% complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / WIZARD_STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Header */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            {(() => {
              const Icon = WIZARD_STEPS[currentStep].icon;
              return <Icon className="w-8 h-8 text-primary-600" />;
            })()}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {WIZARD_STEPS[currentStep].title}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {WIZARD_STEPS[currentStep].description}
          </p>
        </motion.div>

        {/* Step Content */}
        <Card className="p-6 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === WIZARD_STEPS.length - 1 ? (
            <Button
              variant="accent"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              <Check className="w-4 h-4 mr-2" />
              Publish Product
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setCurrentStep(Math.min(WIZARD_STEPS.length - 1, currentStep + 1))}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
