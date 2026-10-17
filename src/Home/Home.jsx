import React from "react";
import Banner from "./Banner";
import HomeCategory from "./HomeCategory";
import CategoryShowcase from "./CategoryShowcase";
import Register from "./Register";
import Client from "./Client";
import AboutUs from "./AboutUs";
import AppStore from "./AppStore";
import Brand from "./Brand";

// Redesigned sections already handle their own width, padding and reveal
// animations, so they sit directly on the page. Un-redesigned ones
// (CategoryShowcase, Brand) get the same width via <Contained />.
const Contained = ({ children }) => (
  <div className="mx-auto max-w-[1500px] px-6 md:px-12">{children}</div>
);

// One hairline divider used everywhere
const Divider = () => (
  <div className="mx-auto max-w-[1500px] px-6 md:px-12">
    <div className="h-px bg-white/10" />
  </div>
);

const Home = () => {
  return (
    // overflow-x-clip (not overflow-hidden) so the hero's search suggestions can drop below it
    <div className="overflow-x-clip bg-[#0d0910]">
      {/* Hero, full bleed */}
      <Banner />

      <Divider />
      <HomeCategory />

      <Divider />
      <Contained>
        <CategoryShowcase />
      </Contained>

      <Contained>
        <Register />
      </Contained>

      <Client />

      <Divider />
      <AboutUs />

      <Divider />
      <AppStore />

      <Divider />
      <Contained>
        <Brand />
      </Contained>
    </div>
  );
};

export default Home;
