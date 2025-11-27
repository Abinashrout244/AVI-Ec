import React from "react";
import Banner from "./Banner";
import HomeCategory from "./HomeCategory";
import CategoryShowcase from "./CategoryShowcase";
import Register from "./Register";
import Client from "./Client";
import AboutUs from "./AboutUs";
import AppStore from "./AppStore";
import Brand from "./Brand";

const Home = () => {
  return (
    <div>
      <Banner />
      <HomeCategory />
      <CategoryShowcase />
      <Register />
      <Client />
      <AboutUs />
      <AppStore />
      <Brand />
    </div>
  );
};

export default Home;
