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

  const handleNavClick = (eventKey) => {
    // Navegar a la ruta correspondiente al elemento de la barra lateral seleccionado
    navigate(eventKey === "" ? "/" : `/${eventKey}`);
  };

  return (
    <div>
      {isLoggedIn ? (
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
              </NavItem>
            ))}
          </SideNav.Nav>
        </SideNav>
      ) : null}
    </div>
  );
};

export default SidebarApp;
