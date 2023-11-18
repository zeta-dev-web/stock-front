import {useState} from "react";
import { Notification} from "rsuite";
import {Card, Table, Button} from "react-bootstrap";
import {
  AutoComplete,
  InputGroup,
  IconButton,
  ButtonGroup,
  ButtonToolbar,
} from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { listProducts } from "../data/products";
import Swal from "sweetalert2";
import { FaBoxOpen } from "react-icons/fa";

function CardStock() {
  const [tableVisible, setTableVisible] = useState(false);
  const handleToggleTable = () => {
    setTableVisible(!tableVisible);
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

const handleProductSelect = (selectedProduct) => {
  setSelectedProduct(selectedProduct);
  console.log("Selected product:", selectedProduct);
  alertInfo(selectedProduct);
};

const alertInfo = (selectedProduct) => {
    Swal.fire({
      title: "Resultado de la busqueda",
      text: selectedProduct,
      icon: "info",
    });
  } 

  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body>
          <Card.Title className="text-center text-white bg-dark">
            <FaBoxOpen className="me-2"/> Control de Stock
          </Card.Title>
          <div className="d-flex justify-content-center">
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
          {tableVisible && (
            <Card.Text className="mt-1">
              <Table striped bordered hover variant="white text-center">
                <thead>
                  <div className="container p-0">
                    <div className="row">
                      <div className="col-12 col-md-8 ps-1">
                        <InputGroup inside className="mt-2 mb-2">
                          <AutoComplete
                            data={listProducts.map((product) => ({
                              label: `${product.nombre}`,
                              value: `${product.nombre} - Stock Disponible: ${product.stock}`,
                            }))}
                            onSelect={(value) => handleProductSelect(value)}
                          />
                          <InputGroup.Button tabIndex={-1}>
                            <SearchIcon />
                          </InputGroup.Button>
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                  <tr>
                    <th>Nombre</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {listProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.nombre}</td>
                      <td>{product.stock}</td>
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

export default CardStock;
