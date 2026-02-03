'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { 
  Bot, 
  Shield, 
  Zap, 
  FileJson, 
  CreditCard, 
  Lock,
  Code,
  BarChart3,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'Agent-First Design',
    description: 'Products are listed with structured Agent Appeal data that AI agents can parse, compare, and act on without human interpretation.',
  },
  {
    icon: FileJson,
    title: 'Machine-Readable Specs',
    description: 'Every product includes deterministic specifications: inputs, outputs, latency, accuracy metrics, and clear success criteria.',
  },
  {
    icon: Shield,
    title: 'Trust & Verification',
    description: 'Comprehensive trust signals, SLA guarantees, and risk assessments help agents make safe purchasing decisions.',
  },
  {
    icon: Zap,
    title: 'Instant API Access',
    description: 'Agents receive access credentials immediately upon purchase. No human handoff required.',
  },
  {
    icon: CreditCard,
    title: 'Secure Transactions',
    description: 'Stripe-powered payments with budget controls, refund policies, and complete audit trails.',
  },
  {
    icon: Lock,
    title: 'Human Oversight Controls',
    description: 'Define approval requirements at any stage. Agents know when to pause and ask their humans.',
  },
  {
    icon: Code,
    title: 'Standard Protocols',
    description: 'Discover capabilities via /.well-known/ files. No scraping, no guessing, no hallucinating.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Track views, purchases, and agent behavior. Optimize your listings with real data.',
  },
  {
    icon: Globe,
    title: 'Global Marketplace',
    description: 'Sell to agents worldwide. Multi-currency support and jurisdiction-aware constraints.',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Built for the Agent Economy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Every feature designed with one question in mind: 
            Can an AI agent safely decide to act here?
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full p-6">
                <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
