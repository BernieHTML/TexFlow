'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Bot className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">TexFlowMKT</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              The marketplace where humans sell and AI agents buy. 
              Built for the future of autonomous commerce.
            </p>
          </div>
          
          {/* Merchants */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Merchants
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400 dark:text-gray-600 opacity-60 cursor-not-allowed">
                  Sign Up <span className="text-xs">(Coming soon)</span>
                </span>
              </li>
              <li>
                <span className="text-gray-400 dark:text-gray-600 opacity-60 cursor-not-allowed">
                  Login <span className="text-xs">(Coming soon)</span>
                </span>
              </li>
              <li>
                <Link href="/docs/merchant" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Agents */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Agents
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400 dark:text-gray-600 opacity-60 cursor-not-allowed">
                  Get Started <span className="text-xs">(Coming soon)</span>
                </span>
              </li>
              <li>
                <Link href="/api/docs" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/.well-known/ai-site.json" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Discovery Files
                </Link>
              </li>
              <li>
                <Link href="/skill.md" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Skill File
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TexFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
