import { useState } from "react";
import {Table, Card, Button} from "react-bootstrap";
import ModalProdApp from "./ModalProdApp";
import ButtonPage from "./ButtonPage";
import { FaBoxOpen } from "react-icons/fa";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { productDelete } from "../api/productsApi";
import Swal from "sweetalert2";
import ModalProductUpdate from "./ModalProductUpdate";
import useGetProducts from "../hooks/useGetProducts";

function StockAdminApp() {
  const [pagina, setPagina] = useState(0);
  const { datos, traerDatos } = useGetProducts(pagina);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false); //Estado para manejo de Modal
  const [producto, setProducto] = useState(null); //datos del producto a actualizar

  const handleClose = () => {
    //Función para cerrar modal
    setProducto(null);
    setShow(false);
    traerDatos();
  };

    const handleShow = (datos) => {
      //Función para mostrar modal
      setProducto(datos);
      setShow(true);
    };


  const handleOpen = () => {
    setOpen(!open);
  };
  const [tableVisible, setTableVisible] = useState(false);
  const handleToggleTable = () => {
    setTableVisible(!tableVisible);
  };

  //Funciones para manejo de paginación---------
  const nextPage = () => {
    //total de los productos = 8 / 2 página
    const totalPages = datos.total / 5;
    console.log(totalPages);
    if (pagina + 1 < totalPages) {
      setPagina(pagina + 5);
    }
  };

  const backPage = () => {
    if (pagina >= 5) {
      setPagina(pagina - 5);
    }
  };
  //---------------------------------------------
  const modProd = (datos) => {
    setProducto(datos);
  };

  const deleteProd = async (id) => {
    Swal.fire({
      title: "¿Quieres borrar el producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await productDelete(id);
        Swal.fire({
          title: "El producto fue borrado",
          text: "",
          icon: "success",
        });
      traerDatos()}
    });
  };

  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body>
          <Card.Title className="text-center text-white bg-dark">
            <FaBoxOpen className="me-2" />
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
          <ModalProdApp
            open={open}
            handleOpen={handleOpen}
            traerDatos={traerDatos}
          />
          {tableVisible && (
            <Card.Text className="mt-1">
              <Table
                responsive
                striped
                bordered
                hover
                variant="white text-center"
              >
                <thead>
                  <tr>
                    <th>Opc</th>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoria</th>
                    <th>Descripcion</th>
                  </tr>
                </thead>
                <tbody>
                  {datos?.productos.length > 0 &&
                    datos.productos.map((producto) => (
                      <tr key={producto._id}>
                        <td>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleShow(producto)}
                          >
                            <MdEditSquare />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            className="ms-1"
                            onClick={() => deleteProd(producto._id)}
                          >
                            <MdDelete />
                          </Button>
                        </td>
                        <td>
                          <img className="img" src={producto.img} />
                        </td>
                        <td>{producto.nombre}</td>
                        <td>{producto.precio}</td>
                        <td>{producto.stock}</td>
                        <td>{producto.categoria.nombre}</td>
                        <td>{producto.descripcion}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {/* Componente del Modal con sus respectivos Props  */}
              {producto && (
                <ModalProductUpdate
                  show={show}
                  handleClose={handleClose}
                  producto={producto}
                  setProducto={modProd}
                />
              )}
              <ButtonPage nextPage={nextPage} backPage={backPage} />
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default StockAdminApp;
