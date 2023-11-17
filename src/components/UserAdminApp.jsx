import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import listUser from "../data/users";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import ModalUserApp from "./ModalUserApp";

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

  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body className="table-responsive">
          <Card.Title className="text-center text-white bg-dark">
            Control de Usuarios
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">asdasdasd</Card.Subtitle>
          <button className="btn btn-primary" onClick={handleOpen}>
            Agregar Usuario
          </button>
          <ModalUserApp open={open} handleOpen={handleOpen}
          />
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
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserAdminApp;
