import {useState} from "react";
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
import useGetProducts from "../hooks/useGetProducts";
import BtnPagProd from "../components/BtnPagProd";
import "../css/CardStock.css"

function CardStock() {
  const [pagina, setPagina] = useState(0);
  const { datos, todosLosProductos, traerDatos, traerTodosLosProductos } =
    useGetProducts(pagina);
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
  };

  // Función para manejo de paginación
  const handlePageChange = (newPage) => {
    setPagina(newPage);
    traerDatos();
  };

  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body>
          <Card.Title className="text-center text-white bg-dark">
            <FaBoxOpen className="me-2" /> Control de Stock
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
              <div className="container p-0">
                <div className="row">
                  <div className="col-12 col-md-8 ps-1">
                    <InputGroup inside className="mt-2 mb-2">
                      <AutoComplete
                        data={todosLosProductos?.map((producto) => ({
                          label: `${producto.nombre}`,
                          value: `${producto.nombre} - Stock Disponible: ${producto.stock}`,
                        }))}
                        onSelect={(value) => handleProductSelect(value)}
                        placeholder="Ingrese el nombre de un producto"
                      />
                      <InputGroup.Button tabIndex={-1}>
                        <SearchIcon />
                      </InputGroup.Button>
                    </InputGroup>
                  </div>
                </div>
              </div>
              <Table
                responsive
                striped
                bordered
                hover
                variant="white text-center"
              >
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {datos?.productos.length > 0 &&
                    datos.productos.map((producto) => (
                      <tr key={producto._id}>
                        <td>
                          <img className="img" src={producto.img} />
                        </td>
                        <td>{producto.nombre}</td>
                        <td>{producto.stock}</td>
                        <td>{producto.descripcion}</td>
                        <td>{producto.precio}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <BtnPagProd nextPage={nextPage} backPage={backPage} />
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardStock;
