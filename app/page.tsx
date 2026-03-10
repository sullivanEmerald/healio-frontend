import { Layout } from '@/components/layout';
import HeroSection from '@/components/section/HeroSection';
import HowItWorksSection from '@/components/section/HowItWorksSection';
import FeaturesSection from '@/components/section/FeaturesSection';
import Faq from '@/components/section/ComplianceSection';
import GetStartedSection from '@/components/section/GetStartedSection';
import AboutUs from '@/components/section/AboutUs';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutUs />
      <HowItWorksSection />
      <FeaturesSection />
      <Faq />
      {/* <GetStartedSection /> */}
    </Layout>
  );
}
