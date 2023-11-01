import Hero from "./components/landing/hero";
import NavbarDefault from "./components/landing/navbar";
import SectionTitle from "./components/landing/sectionTitle";

import Footer from "./components/footer";
import Benefits from "./components/landing/benefits";
import Cta from "./components/landing/cta";
import { benefitOne } from "./components/landing/data";
import Faq from "./components/landing/faq";

const Home = () => {
  return (
    <main className="w-full h-full">

      <NavbarDefault />
      <Hero />
      <SectionTitle
        pretitle="Toolio gives you tiiiime"
        title="Build projects the right way">
        Toolio is a free and open-source project marketplace for developers and designers, powered by the community.
      </SectionTitle>
      <Benefits data={benefitOne} />
      {/* <Benefits imgPos="right" data={benefitTwo} /> */}

      <SectionTitle pretitle="FAQ" title="Let's clear some doubts">
      </SectionTitle>
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}

export default Home;