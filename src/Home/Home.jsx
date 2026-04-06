import React from "react";
import Banner from "./Banner";
import HomeCategory from "./HomeCategory";
import CategoryShowcase from "./CategoryShowcase";
import Register from "./Register";
import Client from "./Client";
import AboutUs from "./AboutUs";
import AppStore from "./AppStore";
import Brand from "./Brand";
import MotionSection from "../components/MotionSection";

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero - full bleed, no container padding */}
      <Banner />

      {/* Section separator */}
      <div className="section-divider" />

      {/* Categories */}
      <MotionSection className="px-4 md:px-12 max-w-screen-2xl mx-auto">
        <HomeCategory />
      </MotionSection>

      {/* Thin separator */}
      <div className="h-px bg-white/5 mx-6 md:mx-20" />

      {/* Products */}
      <MotionSection className="px-4 md:px-12 max-w-screen-2xl mx-auto">
        <CategoryShowcase />
      </MotionSection>

      {/* Register / Workshop CTA */}
      <MotionSection className="px-4 md:px-12 max-w-screen-2xl mx-auto">
        <Register />
      </MotionSection>

      {/* Client Testimonials */}
      <MotionSection className="px-4 md:px-12 max-w-screen-2xl mx-auto">
        <Client />
      </MotionSection>

      {/* Stats + Why Choose Us */}
      <MotionSection className="px-4 md:px-12 max-w-screen-2xl mx-auto">
        <AboutUs />
      </MotionSection>

      {/* App Download */}
      <MotionSection className="px-4 md:px-12 max-w-screen-2xl mx-auto">
        <AppStore />
      </MotionSection>

      {/* Brand logos */}
      <div className="h-px bg-white/5 mx-6 md:mx-20 mb-8" />
      <MotionSection className="px-4 md:px-12 max-w-screen-2xl mx-auto">
        <Brand />
      </MotionSection>
    </div>
  );
};

export default Home;
