import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TexFlow - Empowering the Future of Commerce',
  description: 'A suite of innovative products designed for the AI-driven economy. Where humans and agents collaborate seamlessly.',
  keywords: ['TexFlow', 'AI commerce', 'autonomous agents', 'agent marketplace', 'AI products', 'TexFlowMKT'],
  openGraph: {
    title: 'TexFlow - Empowering the Future of Commerce',
    description: 'A suite of innovative products designed for the AI-driven economy. Where humans and agents collaborate seamlessly.',
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
