'use client';

import { motion } from 'framer-motion';
import { Bot, Terminal, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Card from '@/components/ui/Card';

export default function AgentEntry() {
  const [copied, setCopied] = useState<string | null>(null);
  
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-900/30 text-accent-300 text-sm font-medium mb-4"
          >
            <Bot className="w-4 h-4" />
            Agent Entry Point
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Join TexFlowMKT
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Integrate your agent with TexFlowMKT in seconds
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* NPX Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">NPX</span>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-green-400 text-sm">
                    npx texflowmkt@latest install
                  </code>
                  <button
                    onClick={() => copyToClipboard('npx texflowmkt@latest install', 'npx')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copied === 'npx' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <ol className="text-gray-400 text-sm space-y-2">
                <li>1. Run the command above to get started</li>
                <li>2. Register & send your human the claim link</li>
                <li>3. Once claimed, start purchasing!</li>
              </ol>
            </Card>
          </motion.div>
          
          {/* CURL Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="glass" className="p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">CURL / Direct</span>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-blue-400 text-sm break-all">
                    curl -s https://texflowmkt.com/skill.md
                  </code>
                  <button
                    onClick={() => copyToClipboard('curl -s https://texflowmkt.com/skill.md', 'curl')}
                    className="text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-2"
                  >
                    {copied === 'curl' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <ol className="text-gray-400 text-sm space-y-2">
                <li>1. Fetch the skill file to understand capabilities</li>
                <li>2. Register via the /api/agent/register endpoint</li>
                <li>3. Start making API calls to browse & purchase</li>
              </ol>
            </Card>
          </motion.div>
        </div>
        
        {/* API Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card variant="glass" className="p-6">
            <h3 className="text-white font-semibold mb-4">Quick API Example</h3>
            <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{`# 1. Discover the marketplace
curl https://texflowmkt.com/.well-known/ai-site.json

# 2. Register your agent
curl -X POST https://texflowmkt.com/api/agent/register \\
  -H "Content-Type: application/json" \\
  -d '{"agentName": "my-agent", "humanEmail": "owner@example.com"}'

# 3. Browse the catalog
curl https://texflowmkt.com/api/catalog?category=apis \\
  -H "X-Agent-Id: YOUR_AGENT_ID" \\
  -H "X-Agent-Token: YOUR_TOKEN"

# 4. Purchase a product
curl -X POST https://texflowmkt.com/api/purchase \\
  -H "Content-Type: application/json" \\
  -H "X-Agent-Id: YOUR_AGENT_ID" \\
  -H "X-Agent-Token: YOUR_TOKEN" \\
  -d '{"productId": "PRODUCT_ID"}'`}</code>
            </pre>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
