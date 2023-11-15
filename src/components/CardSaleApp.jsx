import { React,useState } from "react";
import { Button,Card, Table } from "react-bootstrap";
import SearchIcon from "@rsuite/icons/Search";
import { AutoComplete, InputGroup,
  IconButton,
  ButtonGroup,
  ButtonToolbar,
} from "rsuite";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Sale.css"
import { FaSistrix, FaBoxOpen, FaProductHunt, } from "react-icons/fa6";
import {
  MdPriceChange,
  MdPriceCheck,
  MdOutlineDeleteForever,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import ModalApp from "./ModalApp";

const CardSaleApp = ({ darkMode, handleOpen, open, handletime, dateTime }) => {
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
  const handleCancelSale = () => {
    if (selectedProducts.length > 0) {
      Swal.fire({
        title: "¿Quieres cancelar la venta?",
        text: "Esta acción eliminará todos los productos de la venta.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No, volver atras",
        confirmButtonText: "Sí, cancelar la venta",
      }).then((result) => {
        if (result.isConfirmed) {
          // Limpiar la lista de productos seleccionados
          setSelectedProducts([]);
          Swal.fire({
            title: "Venta cancelada",
            text: "Los productos de la venta han sido eliminados.",
            icon: "success",
          });
        }
      });
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    // Clonar el array para no mutar el estado directamente
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = newQuantity;

    setSelectedProducts(updatedProducts);
  };

  return (
    <div className="m-4">
      <Card className="container user_card">
        <Card.Body className="table-responsive">
          <Card.Title className="text-center text-white">
            <div className="d-flex me-1 mt-1 flex-row justify-content-center">
              <MdOutlineShoppingCartCheckout className="me-2" />
              Sistema de Venta
            </div>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <div className="d-flex me-1 mt-1 flex-row">
              <FaSistrix className="me-1 mt-1" />
              Busque el producto para agregar:
            </div>
            <div className="container p-0">
              <div className="row">
                <div className="col-12 col-md-6">
                  <InputGroup inside className="mt-2 mb-2">
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
                </div>
              </div>
            </div>
          </Card.Subtitle>
          <Table striped bordered hover variant="light text-center">
            <thead className="card-title">
              <tr>
                <th className="text-center border text-white bg-warning bg-opacity-10">
                  <div className="d-flex me-1 mt-1 flex-row justify-content-center">
                    <FaBoxOpen />
                    <div className="ms-2">Cantidad</div>
                  </div>
                </th>
                <th className="text-center border text-white bg-warning bg-opacity-10">
                  <div className="d-flex me-1 mt-1 flex-row justify-content-center">
                    <FaProductHunt />
                    <div className="ms-2">Producto</div>
                  </div>
                </th>
                <th className="text-center border text-white bg-warning bg-opacity-10">
                  <div className="d-flex me-1 mt-1 flex-row justify-content-center">
                    <MdPriceChange />
                    <div className="ms-2">Precio</div>
                  </div>
                </th>
                <th className="text-center border text-white bg-warning bg-opacity-10">
                  <div className="d-flex me-1 mt-1 flex-row justify-content-center">
                    <MdOutlineDeleteForever />
                    <div className="ms-2">Borrar</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className={`border ${darkMode ? "table-dark" : ""}`}>
              {selectedProducts.map((product, index) => (
                <tr key={index}>
                  <td className="border">
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
                        <div className="text-center m-0 p-1 fw-bold fst-italic">
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
                    </div>
                  </td>
                  <td className="fst-italic">{product.name}</td>
                  <td className="fst-italic">
                    ${product.price * product.quantity}
                  </td>
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
              <tr>
                <td colSpan="3" className="text-end fw-bold border">
                  <div className="d-flex me-1 mt-1 flex-row justify-content-end">
                    <MdPriceCheck />
                    <div className="ms-2">Total</div>
                  </div>
                </td>
                <td
                  className={`fs-5 fw-bold  ${
                    darkMode ? "text-white" : "text-primary"
                  }`}
                >
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
        <div className="d-flex justify-content-end me-3">
          <button
            type="button"
            className="btn buttonsale"
            onClick={handleCancelSale}
          >
            Cancelar Venta
          </button>
          <button
            type="button"
            className="ms-1 btn buttonsale"
            onClick={handletime}
          >
            Realizar Venta
          </button>

          {/* Renderizar el modal directamente */}
          <ModalApp
            open={open}
            handleOpen={handleOpen}
            products={selectedProducts}
            dateTime={dateTime}
          />
        </div>
      </Card>
    </div>
  );
};

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