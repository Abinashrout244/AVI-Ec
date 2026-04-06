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
    <div className="space-y-20">
      <Banner />
      <MotionSection className="px-4 md:px-16">
        <HomeCategory />
      </MotionSection>
      <MotionSection className="px-4 md:px-16">
        <CategoryShowcase />
      </MotionSection>
      <MotionSection className="px-4 md:px-16">
        <Register />
      </MotionSection>
      <MotionSection className="px-4 md:px-16">
        <Client />
      </MotionSection>
      <MotionSection className="px-4 md:px-16">
        <AboutUs />
      </MotionSection>
      <MotionSection className="px-4 md:px-16">
        <AppStore />
      </MotionSection>
      <MotionSection className="px-4 md:px-16">
        <Brand />
      </MotionSection>
    </div>
  );
};

export default Home;
