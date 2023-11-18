import React from "react";
import Carousel from "../components/Carousel";

const HomeScreen = ({ darkMode, isLoggedIn }) => {
  return (
    <div className="vh-100">
      <Carousel isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default HomeScreen;
