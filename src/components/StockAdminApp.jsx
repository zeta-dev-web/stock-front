import { useState } from "react";
import {Table, Card, Button} from "react-bootstrap";
import ModalProdApp from "./ModalProdApp";
import { listProducts } from "../data/products";

function StockAdminApp() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [tableVisible, setTableVisible] = useState(false);
  const handleToggleTable = () => {
    setTableVisible(!tableVisible);
  };
  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body>
          <Card.Title className="text-center text-white bg-dark">
            Control de Stock
          </Card.Title>
          <div className="d-flex justify-content-center">
            <Button variant="outline-info" onClick={handleOpen} size="sm">
              Agregar Producto
            </Button>
            <Button
              variant="outline-success"
              onClick={handleToggleTable}
              size="sm"
              className="ms-2"
            >
              {tableVisible
                ? "Ocultar Lista de Productos"
                : "Ver Lista de Productos"}
            </Button>
          </div>
          <ModalProdApp open={open} handleOpen={handleOpen} />
          {tableVisible && (
            <Card.Text className="mt-1">
              <Table striped bordered hover variant="white text-center">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.nombre}</td>
                      <td>{product.stock}</td>
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

export default StockAdminApp;
