import React from "react";
import { Link } from "react-router-dom";
import imagen01 from "../assets/01.jpg";
import imagen02 from "../assets/2.jpg";
import "../css/Carousel.css";

const Carousel = ({ isLoggedIn }) => {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade vh-100"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner container-carousel vh-100">
        <div className="carousel-item active">
          <img src={imagen01} className="d-block w-100 vh-100" alt="chatgpt" />
        </div>
        <div className="carousel-item">
          <img src={imagen02} className="d-block w-100 vh-100" alt="chatgpt" />
        </div>
        <div className="overlay">
          <div className="h-100 d-flex flex-column align-items-center justify-content-center text-white p-3">
            <h3 className="text-center">
              Bienvenido al Sistema de Gestion de Stock y Ventas para Panaderias
            </h3>
            {!isLoggedIn && (
              <Link to="/login">
                <button className="btn btn-outline-light btn-lg">
                  INICIAR SESION
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
