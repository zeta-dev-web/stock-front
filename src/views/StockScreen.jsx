import React, { useState, useEffect } from "react";
import CardStock from "../components/CardStock";
import { obtenerDatosAuth } from "../api/authApi";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

const StockScreen = () => {
   const [role, setRole] = useState(null);
   const [mensaje, setMensaje] = useState(null);
   const token = JSON.parse(localStorage.getItem("token")) || null;

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

    const handleError = () => {
      Swal.fire({
        title: mensaje,
        text: "Inicie sesión para acceder a este panel",
        icon: "error",
        confirmButtonColor: "#0035FC",
        confirmButtonText: "Iniciar Sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redireccionar a la página /login
          window.location.href = "/login";
        }
      });
    };

  return (
    <>
      {mensaje ? (
        handleError()
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
