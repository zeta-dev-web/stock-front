import React, { useEffect, useState } from "react";
import pan from "../assets/panadero32.png";
import iconogptdark from "../assets/chatgpticon2.png";
import { NavLink, Link } from "react-router-dom";
import {
  FaHouse,
  FaBoxArchive,
  FaBagShopping,
  FaChalkboardUser,
  FaScrewdriverWrench,
  FaUserShield,
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from "react-icons/fa6";

const NavbarApp = ({ darkMode, changeMode, isLoggedIn }) => {
  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("LoginIn");

    // Actualizar el estado isLoggedIn a false
    handlesetIsLoggedIn();
  };
  return (
    <div className="sticky-top">
      <nav
        className={`navbar navbar-expand-lg ${
          darkMode ? "navbar-custom-dark navbar-dark" : "navbar-custom"
        }`}
      >
        <div className="container-fluid">
          <div className="mt-1">
            {localStorage.getItem("LoginIn") && (
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
            <img
              src={darkMode ? pan : pan}
              alt="chatgpt"
              className="pan me-1 ms-1"
            />
            <Link className="navbar-brand ms-2" to="/">
              Sistema de Gestión
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link fw-bold d-flex flex-col"
                        : "nav-link d-flex flex-col"
                    }
                    aria-current="page"
                    to="/"
                  >
                    <div className="d-flex me-1 mt-1 ">
                      <FaHouse />
                    </div>
                    Inicio
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link fw-bold d-flex flex-col"
                        : "nav-link d-flex flex-col"
                    }
                    to="stock"
                  >
                    <div className="d-flex me-1 mt-1">
                      <FaBoxArchive />
                    </div>
                    Panel Stock
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link fw-bold d-flex flex-col"
                        : "nav-link d-flex flex-col"
                    }
                    to="/venta"
                  >
                    <div className="d-flex me-1 mt-1">
                      <FaBagShopping />
                    </div>
                    Panel Venta
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link fw-bold d-flex flex-col"
                        : "nav-link d-flex flex-col"
                    }
                    to="/admin"
                  >
                    <div className="d-flex me-1 mt-1">
                      <FaChalkboardUser />
                    </div>
                    Panel Admin
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link fw-bold d-flex flex-col"
                        : "nav-link d-flex flex-col"
                    }
                    to="/contact"
                  >
                    <div className="d-flex me-1 mt-1">
                      <FaUserShield />
                    </div>
                    Soporte
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link fw-bold d-flex flex-col"
                      : "nav-link d-flex flex-col"
                  }
                  to="/login"
                  onClick={() => handleLogout()}
                >
                  {isLoggedIn ? (
                    <div className="d-flex me-1 mt-1">
                      <FaArrowRightFromBracket />
                    </div>
                  ) : (
                    <div className="d-flex me-1 mt-1">
                      <FaArrowRightToBracket />
                    </div>
                  )}
                  {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className={`d-flex flex-row form-check form-switch pt-0 m-0 mt-2 ${
              darkMode ? "nav-link text-white" : "nav-link text-dark"
            }`}
          >
            <input
              className="form-check-input ms-3"
              type="checkbox"
              id="flexSwitchCheckChecked"
              checked={darkMode}
              onChange={changeMode}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarApp;
