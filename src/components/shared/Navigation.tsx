'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface NavigationProps {
  variant?: 'light' | 'dark';
}

export default function Navigation({ variant = 'light' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTexFlowMKT = pathname?.startsWith('/texflowmkt') || pathname?.startsWith('/merchant') || pathname?.startsWith('/agent');
  const navVariant = isTexFlowMKT ? 'dark' : variant;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'TexFlowMKT', href: '/texflowmkt' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? navVariant === 'dark'
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
            : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
          : navVariant === 'dark'
          ? 'bg-slate-900/80 backdrop-blur-sm'
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
      }`}
      style={{ borderRadius: scrolled ? '0 0 24px 24px' : '0' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white/10 dark:bg-white/5 p-1.5 md:p-2 ring-2 ring-blue-200/50 dark:ring-blue-700/50 transition-all group-hover:ring-blue-400/70 dark:group-hover:ring-blue-500/70">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/texflowlogo.png"
                  alt="TexFlow"
                  fill
                  className="object-contain transition-transform group-hover:scale-110"
                />
              </div>
            </div>
            <span
              className={`text-xl md:text-2xl font-bold transition-colors tracking-wide ${
                navVariant === 'dark'
                  ? 'text-white'
                  : 'text-gray-900 dark:text-white'
              }`}
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 600, letterSpacing: '0.02em' }}
            >
              TexFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    navVariant === 'dark'
                      ? isActive
                        ? 'text-white bg-white/10 backdrop-blur-sm'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                      : isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
                  }`}
                  style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500, letterSpacing: '0.01em' }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2.5 rounded-full transition-all duration-200 ${
              navVariant === 'dark'
                ? 'text-white hover:bg-white/10'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${
              navVariant === 'dark'
                ? 'bg-slate-900/95 backdrop-blur-md'
                : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md'
            } border-t ${
              navVariant === 'dark'
                ? 'border-gray-800'
                : 'border-gray-200 dark:border-gray-800'
            }`}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                      navVariant === 'dark'
                        ? isActive
                          ? 'bg-white/10 text-white'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        : isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
                    }`}
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500, letterSpacing: '0.01em' }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
