import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "../css/sidebar.css";

const routeNames = {
  "": "Inicio",
  admin: "Panel Admin",
  user: "Panel Venta",
};

const SidebarApp = ({ darkMode, changeMode, isLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [onclick,setOnClick] = useState(false);
  const handleOnClick = () => {
    setOnClick(!onclick);
  };

  const handleNavClick = (eventKey) => {
    // Navegar a la ruta correspondiente al elemento de la barra lateral seleccionado
    navigate(eventKey === "" ? "/" : `/${eventKey}`);
  };

  return (
    <div className="">
      <div className="fixed-top d-flex align-items-start flex-column mb-3 mt-3 ms-3">
        <button
          className={`btn ${onclick ? "btn-danger" : "btn-primary"} ${
            darkMode ? "btn-dark" : ""
          }`}
          onClick={handleOnClick}
        >
          {onclick ? "Cerrar" : "Menu"}
        </button>
        {onclick && (
          <div
            className={`d-flex mt-1 card ${
              darkMode ? "bg-dark text-white" : "bg-white"
            }`}
            style={{ width: "12rem" }}
          >
            <div
              className={`card-body ${
                darkMode ? "bg-dark text-white" : "bg-white"
              }`}
            >
              <ul className="list-group list-group-flush">
                <li
                  className={`list-group-item p-0 ${
                    darkMode ? "bg-dark text-white" : "bg-white"
                  }`}
                >
                  <div
                    className={`d-flex flex-row form-check form-switch p-0 m-0${
                      darkMode ? "bg-dark text-white" : "bg-white"
                    }`}
                  >
                    <p className="ms-1">Modo oscuro</p>
                    <input
                      className="form-check-input ms-3"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                      onChange={changeMode}
                    />
                  </div>
                </li>
                <li
                  className={`list-group-item text-center ${
                    darkMode ? "bg-dark text-white" : "bg-white"
                  }`}
                >
                  Inicio
                </li>
                <li
                  className={`list-group-item text-center ${
                    darkMode ? "bg-dark text-white" : "bg-white"
                  }`}
                >
                  Panel de Stock
                </li>
                <li
                  className={`list-group-item text-center ${
                    darkMode ? "bg-dark text-white" : "bg-white"
                  }`}
                >
                  Panel de Ventas
                </li>
                <li
                  className={`list-group-item text-center ${
                    darkMode ? "bg-dark text-white" : "bg-white"
                  }`}
                >
                  Panel Admin
                </li>
                <li
                  className={`list-group-item text-center ${
                    darkMode ? "bg-dark text-white" : "bg-white"
                  }`}
                >
                  Ajustes
                </li>
                <li
                  className={`list-group-item text-center ${
                    darkMode ? "bg-dark text-white" : "bg-white"
                  }`}
                >
                  Soporte
                </li>
                <li
                  className={`list-group-item text-center ${
                    darkMode ? "bg-dark text-white" : "bg-white"
                  }`}
                >
                  Cerrar Sesion
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* {isLoggedIn ? (
        <SideNav
          onSelect={handleNavClick}
          selected={location.pathname.replace("/", "")}
        >
          <SideNav.Toggle />
          <SideNav.Nav>
            {Object.keys(routeNames).map((key) => (
              <NavItem key={key} eventKey={key}>
                <NavIcon>
                  <i
                    className="fa fa-fw fa-home"
                    style={{ fontSize: "10rem" }}
                  />
                </NavIcon>
                <NavText>{routeNames[key]}</NavText>
                  <div className="form-check form-switch me-3">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                onChange={changeMode}
              />
            </div>
              </NavItem>
            ))}
          </SideNav.Nav>
        </SideNav>
      ) : null} */}
    </div>
  );
};

export default SidebarApp;
