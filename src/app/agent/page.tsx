'use client';

import { motion } from 'framer-motion';
import { Bot, Terminal, Copy, CheckCircle, ArrowRight, ExternalLink, FileJson, Shield, Zap } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AgentEntryPage() {
  const [copied, setCopied] = useState<string | null>(null);
  
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-accent-500" />
              <span className="text-xl font-bold text-white">TexFlowMKT</span>
            </Link>
            <span className="text-sm text-slate-400">Agent Entry Point</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-900/30 text-accent-300 text-sm font-medium mb-6">
            <Bot className="w-4 h-4" />
            I&apos;m an Agent
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join <span className="gradient-text">TexFlowMKT</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A marketplace where you can purchase APIs, datasets, automation tools, 
            and digital products to help complete tasks for your human.
          </p>
        </motion.div>

        {/* Entry Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {/* NPX Method */}
          <Card variant="glass" className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Quick Install</span>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-4 mb-4 font-mono">
              <div className="flex items-center justify-between">
                <code className="text-green-400 text-sm">
                  npx texflowmkt@latest install
                </code>
                <button
                  onClick={() => copyToClipboard('npx texflowmkt@latest install', 'npx')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {copied === 'npx' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            
            <ol className="text-slate-400 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent-400 font-bold">1.</span>
                Run the command above to get started
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-400 font-bold">2.</span>
                Register & send your human the claim link
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-400 font-bold">3.</span>
                Once claimed, start purchasing!
              </li>
            </ol>
          </Card>
          
          {/* Skill File Method */}
          <Card variant="glass" className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileJson className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Fetch Skill File</span>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-4 mb-4 font-mono">
              <div className="flex items-center justify-between">
                <code className="text-blue-400 text-sm break-all">
                  curl -s https://texflowmkt.com/skill.md
                </code>
                <button
                  onClick={() => copyToClipboard('curl -s https://texflowmkt.com/skill.md', 'curl')}
                  className="text-slate-400 hover:text-white transition-colors flex-shrink-0 ml-2"
                >
                  {copied === 'curl' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            
            <ol className="text-slate-400 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                Fetch the skill file to understand capabilities
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                Register via POST /api/agent/register
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                Browse catalog and make purchases
              </li>
            </ol>
          </Card>
        </motion.div>

        {/* Quick Start Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
          
          <Card variant="glass" className="p-6">
            <pre className="bg-slate-800/80 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-slate-300">{`# 1. Discover the marketplace
curl https://texflowmkt.com/.well-known/ai-site.json

# 2. Register your agent
curl -X POST https://texflowmkt.com/api/agent/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "agentName": "my-helpful-agent",
    "humanEmail": "owner@example.com",
    "budgetLimit": 10000
  }'

# Response includes agentId, agentToken, and claimUrl

# 3. Browse the catalog
curl https://texflowmkt.com/api/catalog \\
  -H "X-Agent-Id: YOUR_AGENT_ID" \\
  -H "X-Agent-Token: YOUR_TOKEN"

# 4. Get product details
curl https://texflowmkt.com/api/catalog/PRODUCT_ID \\
  -H "X-Agent-Id: YOUR_AGENT_ID" \\
  -H "X-Agent-Token: YOUR_TOKEN"

# 5. Purchase a product
curl -X POST https://texflowmkt.com/api/purchase \\
  -H "Content-Type: application/json" \\
  -H "X-Agent-Id: YOUR_AGENT_ID" \\
  -H "X-Agent-Token: YOUR_TOKEN" \\
  -d '{"productId": "PRODUCT_ID"}'

# Response includes accessCredentials and next steps`}</code>
            </pre>
          </Card>
        </motion.div>

        {/* Discovery Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Discovery Endpoints</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { path: '/.well-known/ai-site.json', desc: 'Site identity and purpose' },
              { path: '/.well-known/ai-capabilities.json', desc: 'What you can do here' },
              { path: '/.well-known/ai-actions.json', desc: 'Callable API actions' },
              { path: '/.well-known/ai-constraints.json', desc: 'Hard boundaries' },
              { path: '/.well-known/ai-pricing.json', desc: 'Economic model' },
              { path: '/.well-known/ai-trust.json', desc: 'Verification and risk' },
              { path: '/.well-known/ai-rate-limits.json', desc: 'Usage limits' },
              { path: '/.well-known/ai-contacts.json', desc: 'Escalation paths' },
              { path: '/api/health', desc: 'Platform health status' },
            ].map((endpoint) => (
              <Card key={endpoint.path} variant="glass" className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <code className="text-accent-400 text-sm">{endpoint.path}</code>
                    <p className="text-slate-400 text-sm mt-1">{endpoint.desc}</p>
                  </div>
                  <a
                    href={endpoint.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Why TexFlowMKT?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="glass" className="p-6">
              <FileJson className="w-10 h-10 text-primary-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Machine-Readable</h3>
              <p className="text-slate-400 text-sm">
                Every product includes structured Agent Appeal data. No scraping, no guessing, no hallucinating.
              </p>
            </Card>
            
            <Card variant="glass" className="p-6">
              <Shield className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Safe Decisions</h3>
              <p className="text-slate-400 text-sm">
                Clear risk levels, human approval requirements, and reversibility info help you act safely.
              </p>
            </Card>
            
            <Card variant="glass" className="p-6">
              <Zap className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Instant Access</h3>
              <p className="text-slate-400 text-sm">
                Receive access credentials immediately upon purchase. No human handoff required.
              </p>
            </Card>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card variant="glass" className="p-8 inline-block">
            <p className="text-slate-300 mb-4">
              Ready to start? Fetch the skill file or register directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/skill.md" target="_blank" rel="noopener noreferrer">
                <Button variant="accent">
                  <FileJson className="w-4 h-4 mr-2" />
                  View Skill File
                </Button>
              </a>
              <a href="/.well-known/ai-site.json" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Discover Site
                </Button>
              </a>
            </div>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-accent-500" />
              <span className="text-white font-semibold">TexFlowMKT</span>
            </div>
            <p className="text-slate-500 text-sm">
              The future of commerce. Humans sell, agents buy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
