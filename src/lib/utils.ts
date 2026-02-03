import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function calculatePlatformFee(amount: number): { platformFee: number; sellerAmount: number } {
  const platformFee = Math.round(amount * 0.05); // 5%
  const sellerAmount = amount - platformFee;
  return { platformFee, sellerAmount };
}

export const PRODUCT_TYPES = [
  'API',
  'Dataset',
  'Automation',
  'SaaS Tool',
  'Prompt Pack',
  'Model',
  'Plugin',
  'Web Scraping',
  'Translation',
  'Image Generation',
  'Other',
] as const;

export const CATEGORIES = [
  { name: 'APIs', slug: 'apis', description: 'Programmatic interfaces and endpoints' },
  { name: 'Web Scraping', slug: 'web-scraping', description: 'Data extraction tools and services' },
  { name: 'Translation', slug: 'translation', description: 'Language translation services' },
  { name: 'Image Generation', slug: 'image-generation', description: 'AI image creation tools' },
  { name: 'Data Processing', slug: 'data-processing', description: 'Data transformation and analysis' },
  { name: 'Automation', slug: 'automation', description: 'Workflow automation tools' },
  { name: 'AI Models', slug: 'ai-models', description: 'Trained models and inference APIs' },
  { name: 'Datasets', slug: 'datasets', description: 'Curated data collections' },
  { name: 'Integrations', slug: 'integrations', description: 'Third-party service connectors' },
  { name: 'Utilities', slug: 'utilities', description: 'General purpose tools' },
] as const;
