import React, { useEffect, useState } from "react";
import pan from "../assets/panadero32.png";
import iconogptdark from "../assets/chatgpticon2.png";
import { NavLink, Link } from "react-router-dom";

const NavbarApp = ({ darkMode, changeMode, isLoggedIn }) => {
  return (
    <div className="sticky-top">
      <nav
        className={`navbar navbar-expand-lg ${
          darkMode ? "navbar-custom-dark navbar-dark" : "navbar-custom"
        }`}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-start">
            <img
              src={darkMode ? pan : pan}
              alt="chatgpt"
              className="pan pt-1 me-1"
            />
            <Link className="navbar-brand" to="/">
              Sistema de Gestión
            </Link>
          </div>
          <div className="d-flex align-items-center order-lg-1">
            <div className="form-check form-switch me-3">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                onChange={changeMode}
              />
            </div>
            {isLoggedIn && (
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            )}
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link fw-bold" : "nav-link"
                    }
                    aria-current="page"
                    to="/"
                  >
                    Inicio
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link fw-bold" : "nav-link"
                    }
                    to="*"
                  >
                    App
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link fw-bold" : "nav-link"
                    }
                    to="/contact"
                  >
                    Contacto
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link fw-bold" : "nav-link"
                  }
                  to="/login"
                >
                  {isLoggedIn ? "Cerrar sesión" : ""}
                </NavLink>
              </li>
              {isLoggedIn && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link fw-bold" : "nav-link"
                    }
                    to="/admin"
                  >
                    Administrador
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarApp;
