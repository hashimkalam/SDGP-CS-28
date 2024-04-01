import React from "react";
import Hero from "../../components/hero/hero";
import HowItWorks from "../../components/how-it-works/howitworks";
import PriceSection from "../../components/priceSection/PriceSection";
import Footer from "../../components/footer/footer";
import Testimonials from "../../components/Testimonials";

function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <PriceSection />
      {/*<Testimonials /> */}
      <Footer />
    </div>
  );
}

export default Home;
