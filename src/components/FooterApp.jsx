import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { PiStarFill } from "react-icons/pi";
import "../css/Footer.css"; 

const FooterApp = ({ darkMode }) => {
  return (
    <div className="">
      <footer className={`${darkMode ? "footer-dark" : "footer"}`}>
        <div className="container text-center">
          <p>
            Desarrollado con <FontAwesomeIcon icon={faHeart} className="icon" />
          </p>
          <p className="m-0">
            Derechos de propiedad reservados &copy; 2023 <PiStarFill />
             StarCode
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FooterApp;
