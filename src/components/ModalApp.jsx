import { useState } from "react";
import React from "react";
import { Card, Table } from "react-bootstrap";
import { FaSistrix, FaBoxOpen, FaProductHunt } from "react-icons/fa6";
import {
  MdPriceChange,
} from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { Modal, Toggle, Button, Placeholder } from "rsuite";

const ModalApp = ({ open, handleOpen, products, dateTime }) => {
  const [overflow, setOverflow] = React.useState(true);

  //seleccione metodo de pago
const handleConfirmSale = () => {
  Swal.fire({
    title: "Seleccione metodo de pago",
    text: "Elija pago con tarjeta o efectivo",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#0035FC",
    cancelButtonColor: "#2DB203",
    cancelButtonText: "Efectivo",
    confirmButtonText: "Tarjeta",
  }).then((result) => {
    if (result.isConfirmed) {
      handleCardSale(true);
    } else {
     handleCardSale(false);
      };
    }
  );
};

//selecciona tarjeta
const handleCardSale = (option) => {
  if (option) {
    Swal.fire({
      title: "Metodo seleccionado: Tarjeta",
      text: "¿Desea imprimir el comprobante?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#0035FC",
      confirmButtonText: "Imprimir Comprobante",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Comprobante impreso con éxito!",
          icon: "success",
        });
      }
    });
  }
  else{
     Swal.fire({
       title: "Metodo seleccionado: Efectivo",
       text: "¿Desea imprimir el comprobante?",
       icon: "success",
       showCancelButton: true,
       confirmButtonColor: "#0035FC",
       confirmButtonText: "Imprimir Comprobante",
       cancelButtonText: "Cancelar",
     }).then((result) => {
       if (result.isConfirmed) {
         Swal.fire({
           title: "Comprobante impreso con éxito!",
           icon: "success",
         });
       }
     });
  }
}
//selecciona efectivo


  return (
    <>
      <Modal overflow={overflow} open={open} onClose={handleOpen}>
        <Modal.Header>
          <Modal.Title className="fw-bold text-center">
            Comprobante de Compra
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <div className="d-flex flex-row justify-content-center">
            <p className="fw-semibold m-0 fs-5">
              Nombre del negocio: Panaderia tu pancito
            </p>
          </div>
          <div className="d-flex flex-row justify-content-between mt-3 mb-1">
            <p className="text-dark fw-semibold m-0 ps-2">
              Fecha:{dateTime?.[0]}
            </p>
            <p className="text-dark fw-semibold m-0 pe-2">
              Hora:{dateTime?.[1]}
            </p>
          </div>
          <Table striped bordered hover variant="light text-center">
            <thead className="card-title">
              <tr>
                <th className="text-center border text-white bg-dark">
                  <div className="d-flex me-1 mt-1 flex-row justify-content-center">
                    <FaBoxOpen />
                    <div className="ms-2">Cantidad</div>
                  </div>
                </th>
                <th className="text-center border text-white bg-dark">
                  <div className="d-flex me-1 mt-1 flex-row justify-content-center">
                    <FaProductHunt />
                    <div className="ms-2">Producto</div>
                  </div>
                </th>
                <th className="text-center border text-white bg-dark">
                  <div className="d-flex me-1 mt-1 flex-row justify-content-center">
                    <MdPriceChange />
                    <div className="ms-2">Precio</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="border">
                    <div className="m-0 p-0 d-flex justify-content-center">
                      <div className="text-center m-0 p-1 fw-bold fst-italic">
                        {product.quantity}
                      </div>
                      <br />
                    </div>
                  </td>
                  <td className="fst-italic">{product.name}</td>
                  <td className="fst-italic">
                    ${product.price * product.quantity}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="text-end fw-bold border">
                  <div className="d-flex me-1 mt-1 flex-row justify-content-end">
                    <div className="ms-2">Total Pagado</div>
                  </div>
                </td>
                <td className="fs-5 fw-bold text-dark">
                  $
                  {products.reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  )}
                </td>
              </tr>
            </tbody>
            <p className="text-start fw-semibold mt-3 fs-6 ps-0">
              Muchas Gracias por su compra
            </p>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOpen} color="red" appearance="ghost">
            Cancelar Venta
          </Button>
          <Button onClick={handleConfirmSale} color="green" appearance="ghost">
            Confirmar Venta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalApp;
