import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Directions } from "@/components/sections/Directions";
import { About } from "@/components/sections/About";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { OfficeMap } from "@/components/sections/OfficeMap";
import { AiBanner } from "@/components/sections/AiBanner";
import { Process } from "@/components/sections/Process";
import { Audit } from "@/components/sections/Audit";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Directions />
      <About />
      <ServicesTabs />
      <OfficeMap />
      <AiBanner />
      <Process />
      <Audit />
      <Projects />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
