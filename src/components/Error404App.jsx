import React, { useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import error404 from "../assets/error404.json";
const Error404App = () => {
  const playerRef = useRef(null);
  return (
    <div className="100-vw">
      <Player
        className="mt-5"
        ref={playerRef}
        autoplay={true}
        loop={true}
        controls={false}
        src={error404}
        style={{ height: "80vh", width: "80vw" }}
      ></Player>
    </div>
  );
};

export default Error404App;
