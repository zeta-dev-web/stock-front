import React, { useEffect, useState } from 'react'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import StockAdminApp from '../components/StockAdminApp';
import UserAdminApp from '../components/UserAdminApp';
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
  const respuesta = await obtenerDatosAuth(token);

  if (respuesta?.msg) {
    setMensaje(respuesta.msg);
  } else {
    setRole(respuesta.role);
  }
  console.log(respuesta);
};

const handleOpenMP = () => {
  setOpenMP(!openMP);
  console.log("openMP in AdminScreen:", openMP);
};


    return (
      <>
        {mensaje ? (
          <div className="container">
            <div className="row pt-5">
              <div className="col">
                <h3>{mensaje}</h3>
                <Link className="nav-link" to="/login">
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
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
            <Navigate to="/" />
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