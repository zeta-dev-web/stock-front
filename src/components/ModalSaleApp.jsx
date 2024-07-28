import { useState } from "react";
import React from "react";
import { Card, Table } from "react-bootstrap";
import { FaSistrix, FaBoxOpen, FaProductHunt } from "react-icons/fa6";
import { MdPriceChange } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { Modal, Toggle, Button, Placeholder } from "rsuite";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { agregarVenta } from "../api/ventasApi";
import { productUpdate } from "../api/productsApi";

const ModalSaleApp = ({
  open,
  handleOpen,
  products,
  dateTime,
  setSelectedProducts,
  traerTodosLosProductos,
}) => {
  const [overflow, setOverflow] = useState(true);
  const user = JSON.parse(localStorage.getItem("usuario"));
  const comercio = import.meta.env.VITE_NOMBRE_DEL_COMERCIO;
  const direccion = import.meta.env.VITE_DIRECCION_DEL_COMERCIO;
  let mediodepago = null;

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
        mediodepago = "Tarjeta";
      } else {
        handleCardSale(false);
        mediodepago = "Efectivo";
      }
    });
  };

  //responde a la seleccion del metodo de pago
  const handleCardSale = async (option) => {
    let formaDePago = option ? "Tarjeta" : "Efectivo";

    // Recolectar datos
    const data = {
      date: dateTime?.[0],
      time: dateTime?.[1],
      pago: formaDePago,
      descripcion: products.map((product) => ({
        cantidad: product.quantity,
        producto: product.nombre,
        precio: product.precio * product.quantity,
      })),
      total: products.reduce(
        (total, product) => total + product.precio * product.quantity,
        0
      ),
    };
    try {
      // Guardar la venta y obtener la respuesta del servidor
      const response = await agregarVenta(data);
      const ventaId = response.ventaId; // Obtener el ID de la venta
      // Actualizar el stock de cada producto vendido
      for (const product of products) {
        const updatedStock = product.stock - product.quantity;
        const response = await productUpdate(product.id, {
          stock: updatedStock,
        });
      }
      traerTodosLosProductos();
      Swal.fire({
        title: `Metodo seleccionado: ${formaDePago}`,
        text: "¿Desea generar el comprobante?",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#0035FC",
        confirmButtonText: "Generar Comprobante",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Generar el PDF
          Swal.fire({
            title: "Comprobante PDF generado con éxito!",
            icon: "success",
          });
          generatePDF(ventaId);
          handleOpen();
          setSelectedProducts([]);
        } else {
          handleOpen();
          setSelectedProducts([]);
        }
      });
    } catch (error) {
      console.error("Error al agregar la venta:", error);
      // Manejar el error según sea necesario
    }
  };
  const generatePDF = (ventaId) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, 150],
    });
    const name = user.name;
    const formadepago = mediodepago;
  
    // Encabezado, Información del negocio, Fecha y hora
    pdf.setFontSize(14);
    pdf.text("Comprobante de Compra", 40, 10, "center");
  
    pdf.setFontSize(12);
    pdf.text(`${comercio}`, 40, 20, "center");
  
    pdf.setFontSize(11);
    pdf.text(`${direccion}`, 40, 25, "center");
  
    pdf.setFontSize(8);
    pdf.text(`Fecha: ${dateTime?.[0]}`, 10, 35);
    pdf.text(`Hora: ${dateTime?.[1]}`, 50, 35);
  
    // Tabla de productos
    pdf.setFontSize(9);
    const columns = ["Cant.", "Producto", "Precio"];
    const rows = products.map((product) => [
      product.quantity,
      product.nombre,
      `$${product.precio * product.quantity}`,
    ]);
  
    // Calcular el total pagado
    const totalPagado = products.reduce(
      (total, product) => total + product.precio * product.quantity,
      0
    );
  
    pdf.autoTable({
      head: [columns],
      body: rows,
      startY: 40,
      theme: "plain",
      styles: { fontSize: 8 },
      margin: { left: 5 }, // Ajuste del margen izquierdo
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20 },
      },
    });
  
    // Total Pagado
    pdf.setFontSize(10);
    pdf.text(
      `Total: $${totalPagado}`,
      75, // Posición en el margen derecho
      pdf.autoTable.previous.finalY + 10,
      "right"
    );
  
    // Fuiste atendido por y ID de la venta
  pdf.setFontSize(6);
  pdf.text(
    `Forma de pago: ${formadepago}`,
    10,
    pdf.autoTable.previous.finalY + 20
  );
  pdf.text(
    `Fuiste atendido por: ${name}`,
    10,
    pdf.autoTable.previous.finalY + 25
  );
  pdf.text(
    `Código de Venta: ${ventaId}`,
    10,
    pdf.autoTable.previous.finalY + 30
  ); 
    // Mensaje de agradecimiento
    pdf.setFontSize(11);
    pdf.text(
      "Muchas Gracias por su compra",
      10,
      pdf.autoTable.previous.finalY + 45
    );
  
    // Leyenda de no válido como factura
    pdf.setFontSize(8);
    pdf.text(
      "Este comprobante no es válido como factura.",
      10,
      pdf.autoTable.previous.finalY + 60
    );
  
    // Guardar el PDF en la computadora
    pdf.save(`VENTA_${ventaId}.pdf`);
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
            <div className="text-dark fw-semibold m-0 fs-5">
              Panaderia tu pancito
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between mt-3 mb-1">
            <div className="text-dark fw-semibold m-0 ps-2">
              Fecha:{dateTime?.[0]}
            </div>
            <div className="text-dark fw-semibold m-0 ps-2">
              Usuario: {user?.name}
            </div>
            <div className="text-dark fw-semibold m-0 pe-2">
              Hora:{dateTime?.[1]}
            </div>
          </div>
          <Table responsive striped bordered hover variant="light text-center">
            <thead className="card-title">
              <tr>
                <th className="text-center border text-white bg-dark col-2">
                  <div className="d-flex me-1 mt-1 flex-row justify-content-center">
                    <FaBoxOpen />
                    <div className="ms-2">Cantidad</div>
                  </div>
                </th>
                <th className="text-center border text-white bg-dark col-7">
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
                  <td className="fst-italic">{product.nombre}</td>
                  <td className="fst-italic">
                    ${product.precio * product.quantity}
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
                      total + product.precio * product.quantity,
                    0
                  )}
                </td>
              </tr>
            </tbody>
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

export default ModalSaleApp;
