import React, { useEffect, useState } from 'react'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import StockAdminApp from '../components/StockAdminApp';
import UserAdminApp from '../components/UserAdminApp';
import { NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { obtenerDatosAuth } from "../api/authApi";
import Spinner from "react-bootstrap/Spinner";


const AdminScreen = ({darkMode}) => {
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
    console.log(respuesta);

    if (respuesta?.msg) {
      // Utiliza el valor actualizado directamente en la función de log
      setMensaje(respuesta.msg);
      console.log("Mensaje establecido:", respuesta.msg);
    } else if (respuesta?.role) {
      setRole(respuesta.role);
    } else {
      // Manejar otros casos si es necesario
    }
  } catch (error) {
    // Manejar errores si es necesario
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
    text: "No tiene acceso a este panel",
    icon: "error",
    confirmButtonColor: "#0035FC",
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.isConfirmed) {
      // Redireccionar a la página /login
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
              <StockAdminApp
                openMP={openMP}
                handleOpenMP={handleOpenMP}
              ></StockAdminApp>
              <UserAdminApp></UserAdminApp>
            </div>
          ) : (
            handleError()
          )
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="grow" variant="danger" />
            <h5 className="ms-3">ESPERANDO RESPUESTA DEL SERVIDOR</h5>
          </div>
        )}
      </>
    );
}

export default AdminScreen