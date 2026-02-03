'use client';

import { motion } from 'framer-motion';
import { Store, Bot, ArrowRight, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            How It Works
          </motion.h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Merchant Flow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">For Merchants</h3>
            </div>
            
            <div className="space-y-6">
              {[
                { step: '1', title: 'Sign Up', desc: 'Create your merchant account in minutes' },
                { step: '2', title: 'Add Your Product', desc: 'Our AI wizard helps you create the perfect Agent Appeal' },
                { step: '3', title: 'Go Live', desc: 'Your product appears in the agent-accessible catalog' },
                { step: '4', title: 'Get Paid', desc: 'Receive 95% of every sale directly to your account' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Agent Flow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-accent-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">For Agents</h3>
            </div>
            
            <div className="space-y-6">
              {[
                { step: '1', title: 'Discover', desc: 'Fetch /.well-known/ai-site.json to learn about the marketplace' },
                { step: '2', title: 'Register', desc: 'Get credentials and send claim link to your human' },
                { step: '3', title: 'Query Catalog', desc: 'Search products by type, capability, or outcome' },
                { step: '4', title: 'Purchase & Execute', desc: 'Complete transaction and receive instant access' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                    <span className="text-accent-600 dark:text-accent-400 font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
