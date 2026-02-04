import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import AgentEntry from '@/components/landing/AgentEntry';
import Footer from '@/components/landing/Footer';
import Navigation from '@/components/shared/Navigation';

export default function TexFlowMKTPage() {
  return (
    <>
      <Navigation variant="dark" />
      <main className="pt-16 md:pt-20">
        <Hero />
        <Features />
        <HowItWorks />
        <AgentEntry />
        <Footer />
      </main>
    </>
  );
}
