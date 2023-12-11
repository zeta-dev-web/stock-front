import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ModalSaleDetails = ({ show, handleClose, venta }) => {
  const { register, handleSubmit, formState, reset } = useForm();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="fs-5">Venta realizada el: {venta?.date} - {venta?.time}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark d-flex container">
        <form noValidate className="bg-dark p-0 m-0 rounded w-100">
          <section className="row">
            <div className="col-md-6 mt-1">
              <label>Fecha:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={venta?.date}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label>Hora:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={venta?.time}
                readOnly
              />
            </div>
            <div className="col-md-12 mt-2">
              <label>Vendedor:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={venta?.usuario.name}
                readOnly
              />
            </div>
            <div className="col-md-12 mt-2">
              <label>Descripción de la venta:</label>
              {venta?.descripcion.map((item, index) => (
                <div key={index}>
                  <textarea
                    className="form-control"
                    defaultValue={`Producto N°: ${index + 1} - Detalle: ${
                      item.producto
                    } - Cantidad: ${item.cantidad} - Precio: $${item.precio}`}
                    readOnly
                    rows={2}
                    style={{ resize: "none", height: "auto" }}
                  />
                </div>
              ))}
            </div>
            <div className="col-md-6 mt-2">
              <label>Total abonado por el cliente:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={`$ ${venta?.total}`}
                readOnly
              />
            </div>
            <div className="col-md-6 mt-2">
              <label>Metodo de pago:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={`${venta?.pago}`}
                readOnly
              />
            </div>
          </section>
          <div className="text-center mt-2">
            <Button
              className="ms-2"
              type="button"
              variant="outline-danger"
              size="sm"
              onClick={handleClose}
            >
              Cerrar
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSaleDetails;
