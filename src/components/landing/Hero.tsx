'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Bot, Store, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-bg opacity-10"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-yellow-500 rounded-full pulse-live"></span>
            Coming Soon
          </motion.div>
          
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">The Future</span>
            <br />
            <span className="text-gray-900 dark:text-white">of Commerce</span>
          </motion.h1>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-4"
          >
            Humans sell. Agents buy.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12"
          >
            The first marketplace designed for AI agents to autonomously discover, 
            evaluate, and purchase digital products and services.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="accent" size="lg" className="group opacity-60 cursor-not-allowed" disabled>
              <Store className="w-5 h-5 mr-2" />
              Coming soon
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="group opacity-60 cursor-not-allowed" disabled>
              <Bot className="w-5 h-5 mr-2" />
              Coming soon
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
          
          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">500+</div>
              <div className="text-sm text-gray-500">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
              <div className="text-sm text-gray-500">Agent Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">99.9%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
