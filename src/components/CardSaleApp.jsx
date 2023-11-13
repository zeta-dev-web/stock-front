import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import SearchIcon from "@rsuite/icons/Search";
import { AutoComplete, InputGroup,
  IconButton,
  ButtonGroup,
  ButtonToolbar,
} from "rsuite";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import "bootstrap/dist/css/bootstrap.min.css";


function CardSaleApp() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (selectedProduct) => {
    const productDetails = initialData.find(
      (product) => product.name === selectedProduct
    );

    if (productDetails) {
      const productToAdd = {
        name: productDetails.name,
        price: productDetails.price,
        quantity: quantity,
      };

      setSelectedProducts([...selectedProducts, productToAdd]);
      setQuantity(1);
    }
  };
  const handleRemoveFromCart = (index) => {
    Swal.fire({
      title: "Quieres eliminar el producto?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, quitar el producto",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProducts = [...selectedProducts];
        updatedProducts.splice(index, 1);
        setSelectedProducts(updatedProducts);
        Swal.fire({
          title: "El producto fue quitado!",
          text: "Si deseas puedes agregarlo nuevamente desde el buscador.",
          icon: "success",
        });
      }
    });
  };

  const handleQuantityChange = (index, newQuantity) => {
    // Clonar el array para no mutar el estado directamente
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = newQuantity;

    setSelectedProducts(updatedProducts);
  };

  return (
    <div className="m-4">
      <Card className="container border border-3 border-danger">
        <Card.Body>
          <Card.Title className="text-center text-dark bg-danger bg-opacity-10 border border-danger border-start-1 rounded-start rounded-end">
            Sistema de Venta
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Busque el producto para agregar:
            <InputGroup inside className="100-w mt-2 mb-2">
              <AutoComplete
                data={initialData.map((product) => ({
                  label: `${product.name} - Precio: $${product.price} - Stock Disponible: ${product.stock}`,
                  value: product.name,
                }))}
                onSelect={(value) => handleAddToCart(value)}
              />{" "}
              <InputGroup.Button tabIndex={-1}>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </Card.Subtitle>
          <Table striped bordered hover variant="light text-center">
            <thead className="boder border-2 border-danger">
              <tr>
                <th className="text-center text-dark bg-warning bg-opacity-10">
                  Cantidad
                </th>
                <th className="text-center text-dark bg-warning bg-opacity-10">
                  Producto
                </th>
                <th className="text-center text-dark bg-warning bg-opacity-10">
                  Precio
                </th>
                <th className="text-center text-dark bg-warning bg-opacity-10">
                  Opciones
                </th>{" "}
                {/* Nueva columna para acciones */}
              </tr>
            </thead>
            <tbody className="boder border-2 border-danger">
              {selectedProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className="m-0 p-0 d-flex justify-content-center">
                      <ButtonGroup className="d-flex flex-row justify-content-center align-items-center">
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            handleQuantityChange(
                              index,
                              Math.max(product.quantity - 1, 1)
                            )
                          }
                        >
                          -
                        </Button>
                        <div className="text-center m-0 p-1 fw-bold">
                          {product.quantity}
                        </div>
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() =>
                            handleQuantityChange(index, product.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </ButtonGroup>
                      <br />
                      {/* <Button
                        className="btn-circular m-0 p-0"
                        size="md"
                        color="green"
                        appearance="subtle"
                        onClick={() =>
                          handleQuantityChange(index, product.quantity + 1)
                        }
                      >
                        +
                      </Button>{" "}
                      {product.quantity}{" "}
                      <Button
                        className="btn-circular m-0 p-0"
                        circle
                        size="md"
                        color="red"
                        appearance="subtle"
                        onClick={() =>
                          handleQuantityChange(
                            index,
                            Math.max(product.quantity - 1, 1)
                          )
                        }
                      >
                        -
                      </Button> */}
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price * product.quantity}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
              {/* Fila para mostrar el total */}
              <tr>
                <td colSpan="3" className="text-end fw-bold">
                  Total:
                </td>
                <td className="fs-5 fw-bold text-primary">
                  $
                  {selectedProducts.reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

const initialData = [
  { name: "Tortillas Gruesas", price: 5, category: "Salado", stock: 50 },
  { name: "Tortillas Finas", price: 4, category: "Salado", stock: 40 },
  { name: "Pan", price: 3, category: "Salado", stock: 30 },
  { name: "Pan Lactal", price: 2, category: "Salado", stock: 25 },
  { name: "Azúcar", price: 1, category: "Dulce", stock: 60 },
  { name: "Leche", price: 2, category: "Lácteos", stock: 70 },
  { name: "Huevos", price: 3, category: "Lácteos", stock: 80 },
  { name: "Mantequilla", price: 4, category: "Productos", stock: 45 },
  { name: "Harina", price: 5, category: "Productos", stock: 55 },
  { name: "Levadura", price: 6, category: "Productos", stock: 35 },
  { name: "Miel", price: 7, category: "Dulce", stock: 25 },
  { name: "Galletas", price: 8, category: "Dulce", stock: 50 },
  { name: "Croissants", price: 9, category: "Dulce", stock: 30 },
  { name: "Pastelitos", price: 10, category: "Dulce", stock: 40 },
  { name: "Donas", price: 11, category: "Dulce", stock: 20 },
  { name: "Bagels", price: 12, category: "Salado", stock: 25 },
  { name: "Panes Integrales", price: 13, category: "Salado", stock: 30 },
  { name: "Bollo", price: 14, category: "Salado", stock: 35 },
  { name: "Panecillos", price: 15, category: "Salado", stock: 40 },
  { name: "CocaCola 2L", price: 2.5, category: "Bebidas", stock: 60 },
  { name: "Pepsi 2L", price: 2.3, category: "Bebidas", stock: 55 },
];

export default CardSaleApp;