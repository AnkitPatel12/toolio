import Head from "next/head";
import Hero from "./components/landing/hero";
import NavbarDefault from "./components/landing/navbar";
import SectionTitle from "./components/landing/sectionTitle";

import { benefitOne, benefitTwo } from "./components/landing/data";
import Benefits from "./components/landing/benefits";
import Footer from "./components/footer";
import Cta from "./components/landing/cta";
import Faq from "./components/landing/faq";
import { useSession, signIn, signOut } from "next-auth/react"

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