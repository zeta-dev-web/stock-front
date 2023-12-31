import { useState } from "react";
import {Table, Card, Button} from "react-bootstrap";
import ModalProdApp from "./ModalProdApp";
import ButtonPage from "./ButtonPage";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { productDelete } from "../api/productsApi";
import Swal from "sweetalert2";
import ModalProductUpdate from "./ModalProductUpdate";
import useGetProducts from "../hooks/useGetProducts";
import ModalCategory from "./ModalCategory";

function StockAdminApp() {
  const [pagina, setPagina] = useState(0);
  const { datos, traerDatos } = useGetProducts(pagina);
  const [open, setOpen] = useState(false);
  const [opencategory, setOpenCategory] = useState(false);
  const [show, setShow] = useState(false); //Estado para manejo de Modal
  const [producto, setProducto] = useState(null); //datos del producto a actualizar

  const handleClose = () => {
    //Función para cerrar modal
    setProducto(null);
    setShow(false);
    traerDatos();
  };

  
  const handleCloseCategory = () => {
    //Función para cerrar modal de categoria
    setOpenCategory(false);
  };

  const handleShow = (datos) => {
    //Función para mostrar modal
    setProducto(datos);
    setShow(true);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

 const handleOpenCategory = () => {
   setOpenCategory(!opencategory);
 };


  const [tableVisible, setTableVisible] = useState(false);
  const handleToggleTable = () => {
    setTableVisible(!tableVisible);
  };

  // Funciones para manejo de paginación---------
  const nextPage = () => {
    const totalPages = Math.ceil(datos.total / 5);
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
        traerDatos();
      }
    });
  };

  return (
    <div className="m-2">
      <Card className="container mt-4 mb-2">
        <Card.Body>
          <Card.Title className="text-center text-white bg-dark">
            <FaBoxOpen className="me-2" />
            Control de Stock
          </Card.Title>
          <div className="d-flex justify-content-center">
            <Button
              variant="outline-warning"
              onClick={handleOpenCategory}
              size="sm"
            >
              Menu de Categorias
            </Button>
            <Button
              variant="outline-info"
              onClick={handleOpen}
              size="sm"
              className="ms-2"
            >
              + Agregar Producto
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
          <ModalCategory
            show={opencategory}
            handleClose={handleCloseCategory}
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
                    <th>Disp</th>
                    <th>Imagen</th>
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
                  traerDatos={traerDatos}
                />
              )}
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

export default StockAdminApp;
