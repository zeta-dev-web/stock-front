import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import SearchIcon from "@rsuite/icons/Search";
import { AutoComplete, InputGroup,
  Button,
  IconButton,
  ButtonGroup,
  ButtonToolbar,
  Notification,
  Placeholder,
} from "rsuite";


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
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  const handleQuantityChange = (index, newQuantity) => {
    // Clonar el array para no mutar el estado directamente
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = newQuantity;

    setSelectedProducts(updatedProducts);
  };

  const Message = React.forwardRef(({ type, ...rest }, ref) => {
    return (
      <Notification ref={ref} {...rest} type={type} header={type}>
        <Placeholder.Paragraph style={{ width: 320 }} rows={3} />
      </Notification>
    );
  });

  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body>
          <Card.Title className="text-center text-white bg-dark">
            Sistema de Venta
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Busque el producto para agregar al carrito{" "}
            <InputGroup inside className="100-w mt-2 mb-2">
              <AutoComplete
                data={initialData.map((product) => product.name)}
                onSelect={(value) => handleAddToCart(value)}
              />
              <InputGroup.Button tabIndex={-1}>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </Card.Subtitle>
          <Table striped bordered hover variant="light text-center">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acciones</th> {/* Nueva columna para acciones */}
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <Button
                      className="btn-circular"
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
                      className="btn-circular"
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
                    </Button>
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price * product.quantity}</td>
                  <td>
                    <Button
                      className="btn-circular"
                      circle
                      size="md"
                      color="red"
                      appearance="subtle"
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
                <td>
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
  { name: "Tortillas Gruesas", price: 5 },
  { name: "Tortillas Finas", price: 4 },
  { name: "Pan", price: 3 },
  { name: "Pan Lactal", price: 2 },
  { name: "Azúcar", price: 1 },
  { name: "Leche", price: 2 },
  { name: "Huevos", price: 3 },
  { name: "Mantequilla", price: 4 },
  { name: "Harina", price: 5 },
  { name: "Levadura", price: 6 },
  { name: "Miel", price: 7 },
  { name: "Galletas", price: 8 },
  { name: "Croissants", price: 9 },
  { name: "Pastelitos", price: 10 },
  { name: "Donas", price: 11 },
  { name: "Bagels", price: 12 },
  { name: "Panes Integrales", price: 13 },
  { name: "Bollo", price: 14 },
  { name: "Panecillos", price: 15 },
];

export default CardSaleApp;