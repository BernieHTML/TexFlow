'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/shared/Navigation';
import Button from '@/components/ui/Button';
import { ArrowRight, Sparkles, Zap, Shield, Globe, Rocket, Code, Store } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navigation variant="light" />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
          {/* Animated blue gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800"></div>
          
          {/* Floating blue orbs matching logo colors */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex justify-center"
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <Image
                    src="/texflowlogo.png"
                    alt="TexFlow"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 bg-clip-text text-transparent">
                  TexFlow
                </span>
              </motion.h1>
              
              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-800 dark:text-gray-200 mb-4"
              >
                Empowering the Future of Commerce
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
              >
                A suite of innovative products designed for the AI-driven economy. 
                Where humans and agents collaborate seamlessly.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              >
                <Link href="/texflowmkt">
                  <Button variant="accent" size="lg" className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                    <Store className="w-5 h-5 mr-2" />
                    Explore TexFlowMKT
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#products">
                  <Button variant="outline" size="lg" className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    View All Products
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-blue-600 dark:border-blue-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Our Products
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                Building the infrastructure for autonomous commerce
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* TexFlowMKT Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Link href="/texflowmkt">
                  <div className="group relative h-full p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2">
                    <div className="absolute top-4 right-4">
                      <Store className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-8">
                      TexFlowMKT
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      The marketplace where humans sell and AI agents buy. Digital products and services optimized for autonomous agent discovery and purchase.
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Coming Soon Cards */}
              {[
                {
                  title: 'Coming Soon',
                  description: 'More innovative products are on the way. Stay tuned for updates.',
                  icon: Rocket,
                },
                {
                  title: 'Coming Soon',
                  description: 'Expanding the TexFlow ecosystem with new solutions.',
                  icon: Sparkles,
                },
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-700 opacity-60">
                    <div className="absolute top-4 right-4">
                      <product.icon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-8">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Why TexFlow?
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description: 'Built for speed and efficiency in the AI economy',
                  color: 'blue',
                },
                {
                  icon: Shield,
                  title: 'Secure & Trusted',
                  description: 'Enterprise-grade security and reliability',
                  color: 'blue',
                },
                {
                  icon: Globe,
                  title: 'Global Scale',
                  description: 'Designed to serve agents worldwide',
                  color: 'blue',
                },
                {
                  icon: Code,
                  title: 'Developer First',
                  description: 'APIs and tools built for developers',
                  color: 'blue',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 mb-8"
            >
              Explore TexFlowMKT and join the future of autonomous commerce
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/texflowmkt">
                <Button variant="secondary" size="lg" className="group bg-white text-blue-600 hover:bg-blue-50">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="relative w-8 h-8">
                <Image
                  src="/texflowlogo.png"
                  alt="TexFlow"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">TexFlow</span>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} TexFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
