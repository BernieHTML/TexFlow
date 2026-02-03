import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import AgentEntry from '@/components/landing/AgentEntry';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <AgentEntry />
      <Footer />
    </main>
  );
}
