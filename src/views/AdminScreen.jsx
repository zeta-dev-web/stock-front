import React, { useEffect, useState } from 'react'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import StockAdminApp from '../components/StockAdminApp';
import UserAdminApp from '../components/UserAdminApp';
import SaleAdminApp from '../components/SaleAdminApp';
import { NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { obtenerDatosAuth } from "../api/authApi";
import Spinner from "react-bootstrap/Spinner";


const AdminScreen = ({ darkMode }) => {
  const [role, setRole] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const token = JSON.parse(localStorage.getItem("token")) || null;
  const [openMP, setOpenMP] = useState(false);

  useEffect(() => {
    queRolEs();
  }, []);

  const queRolEs = async () => {
    try {
      const respuesta = await obtenerDatosAuth(token);

      if (respuesta?.msg) {
        setMensaje(respuesta.msg);
        console.log("Mensaje establecido:", respuesta.msg);
      } else if (respuesta?.role) {
        setRole(respuesta.role);
        console.log("Rol establecido:", respuesta.role);

        // Si el rol es "USER_ROLE", redirigir a la página de inicio
        if (respuesta.role === "USER_ROLE") {
          Swal.fire({
      title: mensaje,
      text: "No tiene permitido el ingreso",
      icon: "error",
      confirmButtonColor: "#0035FC",
      confirmButtonText: "Menu Principal",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
        }
      } else {
        // Manejar otros casos si es necesario
      }
    } catch (error) {
      console.error("Error al obtener datos de autenticación:", error);
    }
  };

  const handleOpenMP = () => {
    setOpenMP(!openMP);
    console.log("openMP in AdminScreen:", openMP);
  };

  const handleError = () => {
    Swal.fire({
      title: mensaje,
      text: "Inicie sesión para acceder a este panel",
      icon: "error",
      confirmButtonColor: "#0035FC",
      confirmButtonText: "Iniciar Sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    });
  };

  return (
    <>
      {mensaje ? (
        handleError()
      ) : role ? (
        role === "ADMIN_ROLE" ? (
          <div className="pb-2">
            <h2 className={`text-center ${darkMode ? "text-light" : ""}`}>
              Pagina de Administración
            </h2>
            <StockAdminApp openMP={openMP} handleOpenMP={handleOpenMP} />
            <UserAdminApp openMP={openMP} handleOpenMP={handleOpenMP} />
            <SaleAdminApp openMP={openMP} handleOpenMP={handleOpenMP} />
          </div>
        ) : null
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="grow" variant="danger" />
          <h5 className="ms-3">ESPERANDO RESPUESTA DEL SERVIDOR</h5>
        </div>
      )}
    </>
  );
};

export default AdminScreen;