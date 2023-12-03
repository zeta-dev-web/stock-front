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
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalSaleApp from "./ModalSaleApp";
import useGetAllProducts from "../hooks/useGetAllProducts";

const CardSaleApp = ({ darkMode, handleOpen, open, handletime, dateTime }) => {
    const { todosLosProductos, traerTodosLosProductos } = useGetAllProducts();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

 const handleAddToCart = (selectedProduct) => {
   const productDetails = todosLosProductos.productos.find(
     (product) => product.nombre === selectedProduct
   );

   // Verificar si el producto ya está en el carrito
   const isProductInCart = selectedProducts.some(
     (product) => product.nombre === selectedProduct
   );

   if (
     productDetails &&
     productDetails.stock > 0 &&
     !isProductInCart &&
     productDetails.estado
   ) {
     const productToAdd = {
       nombre: productDetails.nombre,
       precio: productDetails.precio,
       quantity: quantity,
       id: productDetails._id,
       stock: productDetails.stock,
     };

     setSelectedProducts([...selectedProducts, productToAdd]);
     setQuantity(1);
   } else if (!isProductInCart) {
     // Stock es 0, el producto no existe o el estado no es true, mostrar alerta
     Swal.fire({
       title: "Producto no disponible",
       text: "El producto seleccionado no tiene stock o no esta disponible.",
       icon: "warning",
     });
   } else {
     // El producto ya está en el carrito, mostrar alerta
     Swal.fire({
       title: "Producto en el carrito",
       text: "El producto seleccionado ya está en el carrito.",
       icon: "info",
     });
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
    const updatedProducts = [...selectedProducts];
    const productToUpdate = updatedProducts[index];

    // Obtener la información completa del producto, incluido el stock
    const productDetails = todosLosProductos.productos.find(
      (product) => product.nombre === productToUpdate.nombre
    );

    // Verificar si el nuevoQuantity es menor o igual al stock disponible
    if (productDetails && newQuantity <= productDetails.stock) {
      // Actualizar la cantidad si es válido
      productToUpdate.quantity = newQuantity;
      setSelectedProducts(updatedProducts);
    } else {
      // Mostrar una alerta o manejar el caso de stock insuficiente
      Swal.fire({
        title: "Stock insuficiente",
        text: "La cantidad ingresada supera el stock disponible.",
        icon: "warning",
      });
    }
  };

  const notification = () => {
    toast("No tienes productos agregados", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
    

  return (
    <div className="m-4">
      <ToastContainer transition={Zoom} />
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
                      data={todosLosProductos?.productos.map((product) => ({
                        label: `${product.nombre} - Precio: $${product.precio} - Stock Disponible: ${product.stock}`,
                        value: product.nombre,
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
                  <td className="fst-italic">{product.nombre}</td>
                  <td className="fst-italic">
                    ${product.precio * product.quantity}
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
                      total + product.precio * product.quantity,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn buttonsale"
            onClick={handleCancelSale}
          >
            Cancelar Venta
          </button>
          <button
            type="button"
            className="ms-3 btn buttonsale"
            onClick={() => {
              if (selectedProducts.length === 0) {
                notification();
              } else {
                handletime();
              }
            }}
          >
            Realizar Venta
          </button>

          {/* Renderizar el modal directamente */}
          <ModalSaleApp
            open={open}
            handleOpen={handleOpen}
            products={selectedProducts}
            dateTime={dateTime}
            setSelectedProducts={setSelectedProducts}
            traerTodosLosProductos={traerTodosLosProductos}
          />
        </div>
      </Card>
    </div>
  );
}

export default CardSaleApp;