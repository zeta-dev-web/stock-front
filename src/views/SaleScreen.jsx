import React, { useState, useEffect } from "react";
import CardSaleApp from "../components/CardSaleApp";
import { obtenerDatosAuth } from "../api/authApi";
import Spinner from "react-bootstrap/Spinner";

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
    const respuesta = await obtenerDatosAuth(token);

    if (respuesta?.msg) {
      setMensaje(respuesta.msg);
    } else {
      setRole(respuesta.role);
    }
    console.log(respuesta);
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
        role === "ADMIN_ROLE" || role === "USER_ROLE" ? (
          <div>
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
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="grow" variant="danger" />
          <h5 className="ms-3">ESPERANDO RESPUESTA DEL SERVIDOR</h5>
        </div>
      )}
    </>
  );
};

export default SaleScreen;
