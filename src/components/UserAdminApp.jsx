import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import {Table, Button} from "react-bootstrap";
import listUser from "../data/users";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import ModalUserApp from "./ModalUserApp";
import { MdAccountBox } from "react-icons/md";

const UserAdminApp=({})=>{
  const [open, setOpen] = useState(false);
   const handleOpen = () => {
     setOpen(!open);
   };

const [users, setUsers] = useState([...listUser]);

  const handleRemoveUser = (index) => {
    Swal.fire({
      title: "¿Quieres borrar el usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);

        Swal.fire({
          title: "El usuario fue borrado",
          text: "",
          icon: "success",
        });
      }
    });
  };
  const [tableVisible, setTableVisible] = useState(false);
  const handleToggleTable = () => {
    setTableVisible(!tableVisible);
  };
  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body className="table-responsive">
          <Card.Title className="text-center text-white bg-dark">
            <MdAccountBox className="me-2"/>Control de Usuarios
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
          <ModalUserApp open={open} handleOpen={handleOpen} />
          {tableVisible && (
            <Card.Text className="mt-1">
              <Table striped bordered hover variant="white text-center">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((usuario, index) => (
                    <tr key={index}>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td className="d-flex justify-content-center">
                        <button className="btn btn-warning">M</button>
                        <button
                          className="ms-1 btn btn-danger"
                          onClick={() => handleRemoveUser(index)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserAdminApp;
