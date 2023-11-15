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
import jsPDF from "jspdf";
import "jspdf-autotable";

const ModalApp = ({ open, handleOpen, products, dateTime, setSelectedProducts }) => {
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

//responde a la seleccion del metodo de pago
const handleCardSale = (option) => {
  if (option) {
    Swal.fire({
      title: "Metodo seleccionado: Tarjeta",
      text: "¿Desea generar el comprobante?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#0035FC",
      confirmButtonText: "Generar Comprobante",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Comprobante PDF generado con éxito!",
          icon: "success",
        });
        generatePDF();
        handleOpen();
        setSelectedProducts([]);
      }
    });
  }
  else{
     Swal.fire({
       title: "Metodo seleccionado: Efectivo",
       text: "¿Desea generar el comprobante?",
       icon: "success",
       showCancelButton: true,
       confirmButtonColor: "#0035FC",
       confirmButtonText: "Generar Comprobante",
       cancelButtonText: "Cancelar",
     }).then((result) => {
       if (result.isConfirmed) {
         Swal.fire({
           title: "Comprobante PDF generado con éxito!",
           icon: "success",
         });
         generatePDF()
         handleOpen();
         setSelectedProducts([]);
       }
     });
  }
}
const generatePDF = () => {
  const pdf = new jsPDF();
  const name = "Leo Zamorano";
  // Encabezado, Información del negocio, Fecha y hora...
  pdf.text(
    "Comprobante de Compra",
    pdf.internal.pageSize.width / 2,
    10,
    "center"
  );
  pdf.text(
    "Panaderia tu pancito - Av. Siempre Viva 1022 - San Miguel de Tucumán",
    10,
    20
  );
  pdf.setFontSize(10); // Ajustar el tamaño de la fuente
  pdf.text(`Fecha: ${dateTime?.[0]}`, 10, 30);
  pdf.text(`Hora: ${dateTime?.[1]}`, pdf.internal.pageSize.width - 50, 30);

  // Fuiste atendido por
  pdf.setFontSize(8); // Ajustar el tamaño de la fuente
  pdf.text(`Fuiste atendido por: ${name}`, 10, 40);

  // Tabla de productos
  pdf.setFontSize(12); // Ajustar el tamaño de la fuente
  const columns = ["Cantidad", "Producto", "Precio"];
  const rows = products.map((product) => [
    product.quantity,
    product.name,
    `$${product.price * product.quantity}`,
  ]);

  // Calcular el total pagado
  const totalPagado = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  pdf.autoTable({
    head: [columns],
    body: rows,
    startY: 50,
  });

  // Total Pagado
  pdf.setFontSize(13); // Ajustar el tamaño de la fuente
  pdf.text(
    `Total Pagado: $${totalPagado}`,
    pdf.internal.pageSize.width - 50,
    pdf.internal.pageSize.height - 20
  );

  // Mensaje de agradecimiento
  pdf.setFontSize(10); // Ajustar el tamaño de la fuente
  pdf.text(
    "Muchas Gracias por su compra",
    10,
    pdf.internal.pageSize.height - 10
  );

  // Guardar el PDF en la computadora
  pdf.save("comprobante_compra.pdf");
};


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
          <div className="d-flex justify-content-center">
            <Button onClick={handleOpen} color="red" appearance="ghost">
              Cancelar Venta
            </Button>
            <Button
              onClick={handleConfirmSale}
              color="green"
              appearance="ghost"
            >
              Confirmar Venta
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalApp;
