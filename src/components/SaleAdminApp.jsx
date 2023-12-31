import { useState } from "react";
import { Table, Card, Button } from "react-bootstrap";
import ButtonPage from "./ButtonPage";
import { FaBoxOpen, FaEye} from "react-icons/fa";
import Swal from "sweetalert2";
import useGetAllSales from "../hooks/useGetAllSales";
import ModalSaleDetails from "./ModalSaleDetails";

function SaleAdminApp() {
  const [pagina, setPagina] = useState(0);
  const { todasLasVentas, traerDatos } = useGetAllSales(pagina);
  const [show, setShow] = useState(false); //Estado para manejo de Modal
  const [venta, setVenta] = useState(null);

  const handleClose = () => {
    //Función para cerrar modal
    setShow(false);
    traerDatos();
  };

  const handleShow = (venta) => {
    // Función para mostrar modal con la venta específica
    setVenta(venta); // Asegúrate de tener un estado llamado 'venta' en tu componente
    setShow(true);
  };

  const [tableVisible, setTableVisible] = useState(false);
  const handleToggleTable = () => {
    setTableVisible(!tableVisible);
  };

  // Funciones para manejo de paginación---------
  const nextPage = () => {
    const totalPages = Math.ceil(todasLasVentas.total / 5);
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
    <div className="m-2">
      <Card className="container mt-2 mb-2">
        <Card.Body>
          <Card.Title className="text-center text-white bg-dark">
            <FaBoxOpen className="me-2" />
            Control de Ventas
          </Card.Title>
          <div className="d-flex justify-content-center">
            <Button
              variant="outline-success"
              onClick={handleToggleTable}
              size="sm"
              className="ms-2"
            >
              {tableVisible ? "Ocultar Lista de Ventas" : "Ver Lista de Ventas"}
            </Button>
          </div>
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
                    <th>Opc.</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Usuario</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {todasLasVentas?.ventas.length > 0 &&
                    todasLasVentas.ventas.map((venta) => (
                      <tr key={venta._id}>
                        <td>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleShow(venta)}
                          >
                            <FaEye />
                          </Button>
                        </td>
                        <td>{venta.date}</td>
                        <td>{venta.time}</td>
                        <td>{venta.usuario.name}</td>
                        <td>${venta.total}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {/* Componente del Modal con sus respectivos Props  */}
              {todasLasVentas && (
                <ModalSaleDetails
                  show={show}
                  handleClose={handleClose}
                  venta={venta}
                />
              )}
              <ButtonPage
                nextPage={nextPage}
                backPage={backPage}
                isBackDisabled={pagina < 5}
                isNextDisabled={pagina + 5 >= todasLasVentas.total}
              />
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default SaleAdminApp;
