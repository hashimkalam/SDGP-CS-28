import React from "react";
import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/hero/hero";
import HowItWorks from "../../components/how-it-works/howitworks";
import PriceSection from "../../components/priceSection/PriceSection";
import Footer from "../../components/footer/footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <PriceSection />
      <Footer />
    </div>
  );
}

export default Home;