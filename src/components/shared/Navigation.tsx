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
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/texflowlogo.png"
                alt="TexFlow"
                fill
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <span
              className={`text-xl md:text-2xl font-bold transition-colors ${
                navVariant === 'dark'
                  ? 'text-white'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              TexFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors ${
                    navVariant === 'dark'
                      ? isActive
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                      : isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        navVariant === 'dark' ? 'bg-white' : 'bg-primary-600'
                      }`}
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
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
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      navVariant === 'dark'
                        ? isActive
                          ? 'bg-white/10 text-white'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        : isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
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
