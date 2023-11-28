import React, { useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import ModalUserApp from "./ModalUserApp";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { userDelete, userUpdate } from "../api/usuariosApi";
import useGetAllUsers from "../hooks/useGetAllUsers";
import ButtonPage from "./ButtonPage";
import ModalUserUpdate from "./ModalUserUpdate";

const UserAdminApp = ({}) => {
  const [pagina, setPagina] = useState(0);
  const { datos, traerDatos } = useGetAllUsers(pagina);
  const [show, setShow] = useState(false); //Estado para manejo de Modal
  const [usuario, setUsuario] = useState(null); //datos del usuario a actualizar
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    //Función para cerrar modal
    setUsuario(null);
    setShow(false);
    traerDatos();
  };

  const handleShow = (datos) => {
    //Función para mostrar modal
    setUsuario(datos);
    setShow(true);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const [tableVisible, setTableVisible] = useState(false);
  const handleToggleTable = () => {
    setTableVisible(!tableVisible);
  };

  // Funciones para manejo de paginación---------
  const nextPage = () => {
    const totalPages = Math.ceil(datos.total / 5); // Asegúrate de redondear hacia arriba para obtener el número correcto de páginas
    console.log(totalPages);
    if (pagina + 1 < totalPages) {
      setPagina(pagina + 5);
    }
  };

  const backPage = () => {
    if (pagina >= 5) {
      setPagina(pagina - 5);
    }
  };
  //---------------------------------------------
  const modUser = (datos) => {
    setUsuario(datos);
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "¿Quieres borrar el usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await userDelete(id);
        Swal.fire({
          title: "El usuario fue borrado",
          text: "",
          icon: "success",
        });
        traerDatos();
      }
    });
  };
  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body className="table-responsive">
          <Card.Title className="text-center text-white bg-dark">
            <MdAccountBox className="me-2" />
            Control de Usuarios
          </Card.Title>
          <div className="d-flex justify-content-center">
            <Button variant="outline-info" onClick={handleOpen} size="sm">
              Agregar Usuario
            </Button>
            <Button
              variant="outline-success"
              onClick={handleToggleTable}
              size="sm"
              className="ms-2"
            >
              {tableVisible
                ? "Ocultar Lista de Usuarios"
                : "Ver Lista de Usuarios"}
            </Button>
          </div>
          <ModalUserApp
            open={open}
            handleOpen={handleOpen}
            traerDatos={traerDatos}
          />
          {tableVisible && (
            <Card.Text className="mt-1">
              <Table striped bordered hover variant="white text-center">
                <thead>
                  <tr>
                    <th>Opciones</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {datos?.usuarios.length > 0 &&
                    datos.usuarios.map((usuarios) => (
                      <tr key={usuarios.uid}>
                        <td>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleShow(usuarios)}
                          >
                            <MdEditSquare />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            className="ms-1"
                            onClick={() => deleteUser(usuarios.uid)}
                          >
                            <MdDelete />
                          </Button>
                        </td>
                        <td>{usuarios.name}</td>
                        <td>{usuarios.email}</td>
                        <td>{usuarios.state ? "Activo" : "Inactivo"}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {/* Componente del Modal con sus respectivos Props  */}
              {usuario && (
                <ModalUserUpdate
                  show={show}
                  handleClose={handleClose}
                  usuario={usuario}
                  setUsuario={modUser}
                />
              )}
              <ButtonPage
                nextPage={nextPage}
                backPage={backPage}
                isBackDisabled={pagina < 5}
                isNextDisabled={pagina + 1 >= Math.ceil(datos.total / 5)}
              />
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserAdminApp;
