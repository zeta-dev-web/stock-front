import React, { useState, useEffect } from "react";
import { productUpdate } from "../api/productsApi";
import { categoryList } from "../api/categoriasApi";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ModalProductUpdate = ({ show, handleClose, producto, setProducto }) => {
  const [datosCategorias, setDatosCategorias] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    traerCategorias();
  }, []);

  const traerCategorias = async () => {
    const { categorias } = await categoryList();
    setDatosCategorias(categorias);
  };

  //cuando los datos de los inputs cambian
  const handleChange = (e) => {
    //y si es el checkbox??
    if (e.target.name === "estado") {
      setProducto({ ...producto, [e.target.name]: e.target.checked });
    } else {
      setProducto({ ...producto, [e.target.name]: e.target.value });
    }
  };

  const actualizar = async (e) => {
    //prevenir el refresh de submit
    e.preventDefault();
    Swal.fire({
      title: "Seguro quiere modificar?",
      text: "No podra recuperar los datos que se reemplacen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Guardar Cambios",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await productUpdate(producto._id, producto);
        await Swal.fire({
          title: "Actualizacion exitosa!",
          text: "El producto se guardó",
          icon: "success",
        });
        handleClose();
      } else {
        handleClose();
      }
    });
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="fs-5">Actualizar: {producto?.nombre}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-white d-flex container">
        <form
          noValidate
          onSubmit={actualizar}
          className="bg-light text-dark p-0 m-0 rounded w-100"
        >
          <section className="row">
            <fieldset className="col-12 col-md-6 mb-1">
              <label htmlFor="nameProduct-input" className="form-label">
                Nombre del producto
              </label>
              <input
                type="text"
                id="nameProduct-input"
                className="form-control"
                {...register("nombre", {
                  required: "Debe Ingresar un Nombre.",
                  minLength: {
                    value: 5,
                    message: "Su Nombre debe tener mas de 5 caracteres.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Su Nombre debe tener maximo 20 caracteres.",
                  },
                })}
                required
                minLength={5}
                maxLength={20}
                placeholder="Ingrese el nombre del producto"
                value={producto.nombre}
                onChange={handleChange}
              />
              <div>
                <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                  {errors.nombre?.message}
                </p>
              </div>
            </fieldset>
            <fieldset className="col-12 col-md-6 mb-1">
              <label htmlFor="Price-input" className="form-label">
                Precio
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  id="Price-input"
                  className="form-control"
                  {...register("precio", {
                    required: "Debe Ingresar un Precio.",
                    min: {
                      value: 1,
                      message: "Su precio debe ser mayor a $1.",
                    },
                    max: {
                      value: 5000,
                      message: "Su precio máximo debe ser $5000.",
                    },
                  })}
                  required
                  min={1}
                  max={10000}
                  placeholder="Ingrese el precio"
                  value={producto.precio}
                  onChange={handleChange}
                />
              </div>
              <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                {errors.precio?.message}
              </p>
            </fieldset>
            <fieldset className="col-12 col-md-4 mb-1">
              <label htmlFor="stock-input" className="form-label">
                Stock
              </label>
              <input
                type="number"
                id="stock-input"
                className="form-control"
                {...register("stock", {
                  min: {
                    value: 0,
                    message: "El stock debe ser mayor o igual a 0",
                  },
                  max: {
                    value: 500,
                    message: "El stock no puede superar las 500 unidades",
                  },
                })}
                min={0}
                max={500}
                defaultValue={producto.stock}
                onChange={handleChange}
              />
              <div>
                <p className="text-danger">{errors.stock?.message}</p>
              </div>
            </fieldset>
            <fieldset className="col-12 col-md-8 mb-1">
              <label htmlFor="category-input" className="form-label">
                Categoría
              </label>
              <select
                className="form-control"
                id="category-input"
                {...register("categoria", {
                  required: "Debe seleccionar una categoría.",
                })}
                required
                value={producto.categoria}
                onChange={handleChange}
              >
                <option value="">Seleccione una categoría</option>
                {datosCategorias?.length > 0 &&
                  datosCategorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.nombre}
                    </option>
                  ))}
              </select>
              <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                {errors.categoria?.message}
              </p>
            </fieldset>
            <fieldset className="col-12 mb-1">
              <label htmlFor="description-input" className="form-label">
                Descripción
              </label>
              <textarea
                type="text"
                id="description-input"
                className="form-control"
                {...register("descripcion", {
                  required: "Debe ingresar una descripción.",
                  minLength: {
                    value: 15,
                    message:
                      "La descripción debe tener al menos 15 caracteres.",
                  },
                  maxLength: {
                    value: 100,
                    message:
                      "La descripción no puede exceder los 100 caracteres.",
                  },
                })}
                required
                minLength={15}
                maxLength={100}
                style={{ resize: "none" }}
                placeholder="Por ejemplo: Factura de masa dulce hojaldrada bañada en almíbar con miel."
                value={producto.descripcion}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                {errors.descripcion?.message}
              </p>
            </fieldset>
            <fieldset className="col-12 col-md-12 mb-1 text-center">
              <label htmlFor="image-input" className="form-label">
                Imagen
              </label>
              <div>
                {" "}
                {producto.img ? (
                  <img className="img mb-1" src={producto.img} alt="Producto" />
                ) : (
                  <p className="text-danger">No posee imagen</p>
                )}
              </div>
              <input
                type="text"
                id="image-input"
                className="form-control"
                placeholder="Ingrese una url de una imagen"
                {...register("img", {
                  validate: {
                    isImageUrl: (value) => {
                      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                      return (
                        !value ||
                        urlRegex.test(value) ||
                        "Ingrese una URL válida."
                      );
                    },
                  },
                })}
              />
            </fieldset>
            <fieldset className="col-12 ">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="estado"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked={producto.estado}
                  onChange={handleChange}
                />
                <label className="form-check-label">
                  No Disponible / Disponible
                </label>
              </div>
            </fieldset>
          </section>
          <div className="text-center mt-2">
            <Button
              className="ms-2"
              type="submit"
              variant="outline-success"
              size="sm"
            >
              Guardar cambios
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalProductUpdate;
