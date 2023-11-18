import { useState } from "react";
import {Table, Card, Button} from "react-bootstrap";
import ModalProdApp from "./ModalProdApp";

function StockAdminApp() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body>
          <Card.Title className="text-center text-white bg-dark">
            Control de Stock
          </Card.Title>
          <Button variant="outline-info" onClick={handleOpen} size="sm">
            Agregar Producto
          </Button>
          <ModalProdApp open={open} handleOpen={handleOpen} />
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
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>as</td>
                  <td>as</td>
                </tr>
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default StockAdminApp;
