import {useState} from "react";
import {Card, Table, Button} from "react-bootstrap";
import ButtonPage from "./ButtonPage";
import {
  AutoComplete,
  InputGroup,
  IconButton,
  ButtonGroup,
  ButtonToolbar,
} from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import Swal from "sweetalert2";
import { FaBoxOpen } from "react-icons/fa";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import useGetProducts from "../hooks/useGetProducts";
import useGetAllProducts from "../hooks/useGetAllProducts";
// import BtnPagProd from "../components/BtnPagProd";
import "../css/CardStock.css"

function CardStock() {
  const [pagina, setPagina] = useState(0);
  const { datos, traerDatos } = useGetProducts(pagina);
  const { todosLosProductos, traerTodosLosProductos } = useGetAllProducts();
  console.log("lista:", todosLosProductos);
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

  // Funciones para manejo de paginación---------
  const nextPage = () => {
    const totalPages = Math.ceil(datos.total / 5);
    console.log(datos.total);
    console.log(totalPages);
    if (pagina + 1 < totalPages * 5) {
      setPagina(pagina + 5);
      traerDatos();
    }
  };

  const backPage = () => {
    if (pagina >= 5) {
      setPagina(pagina - 5);
      traerDatos();
    } else if (pagina > 0) {
      setPagina(0);
      traerDatos();
    }
  };
  //---------------------------------------------

  return (
    <div className="m-4 pt-2">
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
                        data={todosLosProductos.productos?.map((producto) => ({
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
                    <th>Disp.</th>
                    <th>Imagen</th>
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
                          {producto.estado == true ? (
                            <FaCircleCheck className="text-primary" />
                          ) : (
                            <FaCircleXmark className="text-danger" />
                          )}
                        </td>
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
              <ButtonPage
                nextPage={nextPage}
                backPage={backPage}
                isBackDisabled={pagina < 5}
                isNextDisabled={pagina + 5 >= datos?.total}
              />
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardStock;
