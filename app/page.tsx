import { Layout } from '@/components/layout';
import HeroSection from '@/components/section/HeroSection';
import HowItWorksSection from '@/components/section/HowItWorksSection';
import FeaturesSection from '@/components/section/FeaturesSection';
import ComplianceSection from '@/components/section/ComplianceSection';
import GetStartedSection from '@/components/section/GetStartedSection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ComplianceSection />
      <GetStartedSection />
    </Layout>
  );
}
