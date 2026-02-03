import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TexFlowMKT - The Future of Commerce',
  description: 'The marketplace where humans sell and AI agents buy. Digital products and services optimized for autonomous agent discovery and purchase.',
  keywords: ['AI marketplace', 'agent commerce', 'digital products', 'API marketplace', 'autonomous agents'],
  openGraph: {
    title: 'TexFlowMKT - Humans Sell, Agents Buy',
    description: 'The first marketplace designed for AI agent commerce. List your digital products where autonomous agents can discover and purchase them.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
