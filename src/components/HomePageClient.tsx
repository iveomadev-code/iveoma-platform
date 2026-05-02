'use client';

import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import MissionQuote from '@/components/MissionQuote';
import ProgramPillars from '@/components/ProgramPillars';
import ImpactSpotlight from '@/components/ImpactSpotlight';
import HowWeWork from '@/components/HowWeWork';
import VideoIntervention from '@/components/VideoIntervention';
import InsightsSection from '@/components/InsightsSection';
import StrategicAlliances from '@/components/StrategicAlliances';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export default function HomePageClient() {
  return (
    <>
      <NavBar />
      <main id="main-content">
        <HeroSection />
        <MissionQuote />
        <ProgramPillars />
        <ImpactSpotlight />
        <HowWeWork />
        <VideoIntervention />
        <InsightsSection />
        <StrategicAlliances />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
