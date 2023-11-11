import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AutoComplete, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

function CardSaleApp() {
  const styles = {
    width: 300,
    marginBottom: 10,
  };

  const initialData = [
    "Tortillas Gruesas",
    "Tortillas Finas",
    "Pan",
    "Pan Lactal",
    "Azúcar",
    "Leche",
    "Huevos",
    "Mantequilla",
    "Harina",
    "Levadura",
    "Miel",
    "Galletas",
    "Croissants",
    "Pastelitos",
    "Donas",
    "Bagels",
    "Panes Integrales",
    "Bollo",
    "Panecillos",
  ];

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (selectedProduct) => {
    const productToAdd = {
      name: selectedProduct,
      price: 10, // Puedes ajustar esto según el precio real
      quantity: quantity,
    };

    setSelectedProducts([...selectedProducts, productToAdd]);
    setQuantity(1); // Restablecer la cantidad a 1 después de agregar al carrito
  };

  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body>
          <Card.Title className="text-center text-white bg-dark">
            Sistema de Venta
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Busque el producto para agregar al carrito{" "}
            <InputGroup inside style={styles}>
              <AutoComplete
                data={initialData}
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
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.quantity}</td>
                  <td>{product.name}</td>
                  <td>${product.price * product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardSaleApp;
