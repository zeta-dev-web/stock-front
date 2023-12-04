import React from "react";
import Carousel from "../components/Carousel";

const HomeScreen = ({ darkMode, isLoggedIn }) => {
  return (
    <div className="h-100">
      <Carousel isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default HomeScreen;
