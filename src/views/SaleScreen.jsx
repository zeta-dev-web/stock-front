import React, { useState, useEffect } from "react";
import CardSaleApp from "../components/CardSaleApp";
import { obtenerDatosAuth } from "../api/authApi";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

const SaleScreen = ({darkMode}) => {
  const [role, setRole] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const token = JSON.parse(localStorage.getItem("token")) || null;
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    queRolEs();
  }, []);

  const queRolEs = async () => {
    try {
      const respuesta = await obtenerDatosAuth(token);
      if (respuesta?.msg) {
        setMensaje(respuesta.msg);
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

  const handleOpen = () => {
    setOpen(!open);
  };

const handletime = () => {
  const now = new Date();
  const formattedDateTime = [
    now.toLocaleDateString(),
    `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`,
  ];
  setDateTime(formattedDateTime);
  handleOpen();
};


  return (
    <>
      {mensaje ? (
        handleError()
      ) : role ? (
        role === "ADMIN_ROLE" || role === "USER_ROLE" ? (
          <div className="mt-5 pt-3">
            <CardSaleApp
              darkMode={darkMode}
              handleOpen={handleOpen}
              open={open}
              handletime={handletime}
              dateTime={dateTime}
            />
          </div>
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <div className="d-flex justify-content-center mt-5 pt-5">
          <Spinner animation="grow" variant="danger" />
          <h5 className="ms-3">ESPERANDO RESPUESTA DEL SERVIDOR</h5>
        </div>
      )}
    </>
  );
};

export default SaleScreen;
