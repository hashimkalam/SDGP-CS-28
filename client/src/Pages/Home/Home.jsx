import React from "react";
import Hero from "../../components/hero/hero";
import HowItWorks from "../../components/how-it-works/howitworks";
import PriceSection from "../../components/priceSection/PriceSection";
import Footer from "../../components/footer/footer";
import AboutUs from "../../components/OurTeam";

function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <PriceSection />
      <Footer />
    </div>
  );
}

export default Home;
