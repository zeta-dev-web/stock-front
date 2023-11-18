import React, { useState, useEffect } from "react";
import CardStock from "../components/CardStock";
import { obtenerDatosAuth } from "../api/authApi";
import Spinner from "react-bootstrap/Spinner";

const StockScreen = () => {
   const [role, setRole] = useState(null);
   const [mensaje, setMensaje] = useState(null);
   const token = JSON.parse(localStorage.getItem("token")) || null;
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
  return (
    <>
      {mensaje ? (<div className="container">
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
        role === "ADMIN_ROLE" || role === "USER_ROLE" ? (
    <div>
      <CardStock />
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
};

export default StockScreen;
