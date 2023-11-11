import React, { useState, Component } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHouse,
  FaBoxArchive,
  FaBagShopping,
  FaChalkboardUser,
  FaScrewdriverWrench,
  FaUserShield,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/sidebar.css";
import { slide as Menu } from "react-burger-menu";

const SidebarApp = ({ darkMode, changeMode, isLoggedIn }) => {
  const navigate = useNavigate();
  const [onclick, setOnClick] = useState(false);
  const handleOnClick = () => {
    setOnClick(!onclick);
  };

  return (
    <div className="">
      <button
        className={`fixed-top d-flex col-2 mt-3 ms-2 ${
          onclick ? "" : "buttonside"
        } ${darkMode ? "" : "buttonside"}`}
        onClick={handleOnClick}
      >
        {onclick ? "Cerrar" : "Menu"}
      </button>
      <div
        className={`fixed-top d-flex flex-column mb-3 mt-3 pt-0 ms-0 col-5 bg-div ${
          darkMode ? "navbar-custom-dark text-white" : "bg-div"
        }`}
      >
        {onclick && (
          <div
            className={`d-flex mt-0 card menuflot vh-100 mt-5 ${
              darkMode
                ? "navbar-custom-dark text-white sidebardark"
                : "navbar-custom sidebar"
            }`}
            style={{ width: "12rem" }}
          >
            <div
              className={`card-body sidebarbody ${
                darkMode
                  ? "navbar-custom-dark text-white"
                  : "navbar-custom text-white"
              }`}
            >
              <ul className="list-group list-group-flush">
                <li
                  className={`d-flex list-group-item text-center ps-0 ${
                    darkMode
                      ? "navbar-custom-dark text-white"
                      : "navbar-custom text-white"
                  }`}
                  onClick={() => navigate("/")}
                >
                  <div className="me-2">
                    <FaHouse />
                  </div>
                  Inicio
                </li>
                <li
                  className={`d-flex list-group-item text-center ps-0 ${
                    darkMode
                      ? "navbar-custom-dark text-white"
                      : "navbar-custom text-white"
                  }`}
                  onClick={() => navigate("/stock")}
                >
                  <div className="me-2">
                    <FaBoxArchive />
                  </div>
                  Panel Stock
                </li>
                <li
                  className={`d-flex list-group-item text-center ps-0 ${
                    darkMode
                      ? "navbar-custom-dark text-white"
                      : "navbar-custom text-white"
                  }`}
                  onClick={() => navigate("/venta")}
                >
                  <div className="me-2">
                    <FaBagShopping />
                  </div>
                  Panel Ventas
                </li>
                <li
                  className={`d-flex list-group-item text-center ps-0 ${
                    darkMode
                      ? "navbar-custom-dark text-white"
                      : "navbar-custom text-white"
                  }`}
                  onClick={() => navigate("/admin")}
                >
                  <div className="me-2">
                    <FaChalkboardUser />
                  </div>
                  Panel Admin
                </li>
                <li
                  className={`d-flex list-group-item text-center ps-0 ${
                    darkMode
                      ? "navbar-custom-dark text-white"
                      : "navbar-custom text-white"
                  }`}
                  onClick={() => navigate("/ajustes")}
                >
                  <div className="me-2">
                    <FaScrewdriverWrench />
                  </div>
                  Ajustes
                </li>
                <li
                  className={`d-flex list-group-item text-center ps-0 ${
                    darkMode
                      ? "navbar-custom-dark text-white"
                      : "navbar-custom text-white"
                  }`}
                  onClick={() => navigate("/contacto")}
                >
                  <div className="me-2">
                    <FaUserShield />
                  </div>
                  Soporte
                </li>
                <li
                  className={`d-flex list-group-item text-center ps-0 ${
                    darkMode
                      ? "navbar-custom-dark text-white"
                      : "navbar-custom text-white"
                  }`}
                  onClick={() => navigate("/cerrarsesion")}
                >
                  <div className="me-2">
                    <FaArrowRightFromBracket />
                  </div>
                  Cerrar Sesion
                </li>
                <li
                  className={`d-flex list-group-item p-0 mt-3 mb-0 ${
                    darkMode
                      ? "navbar-custom-dark text-white"
                      : "navbar-custom   text-white"
                  }`}
                >
                  <div
                    className={`d-flex flex-row form-check form-switch p-0 m-0 mt-2 ${
                      darkMode
                        ? " navbar-custom-dark text-white"
                        : " navbar-custom text-white"
                    }`}
                  >
                    <p className="ms-1">Modo oscuro</p>
                    <input
                      className="form-check-input ms-3"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked={darkMode}
                      onChange={changeMode}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarApp;
