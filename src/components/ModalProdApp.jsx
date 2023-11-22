import { useState } from "react";
import { Card, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import {Button} from "react-bootstrap";
import "sweetalert2/src/sweetalert2.scss";
import { Modal } from "rsuite";
import { useForm } from "react-hook-form";

const ModalProdApp = ({ open, handleOpen }) => {
  const [overflow, setOverflow] = useState(true);
const {
  register,
  handleSubmit,
  formState: { errors, isValid },
  setValue,
  reset,
} = useForm({
  mode: "onChange", // Validar al cambiar el formulario
});

const newProduct = (data) => {
  // Validar el formulario antes de realizar alguna acción
  if (!isValid) {
    // Muestra una alerta o realiza alguna acción según tus necesidades
    Swal.fire({
      title: "Error",
      text: "Por favor, completa todos los campos correctamente.",
      icon: "error",
    });
    return;
  }

  // Lógica para guardar el producto
  console.log(data);

  // Cerrar el modal después de guardar
  handleOpen();
};

const handleReset = () => {
  Swal.fire({
    title: "Seguro quiere cancelar?",
    text: "No podra recuperar los datos que no se guardaron",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Cancelar",
    cancelButtonText: "No, Seguir cargando",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Informacion Eliminada!",
        text: "El producto no se guardó",
        icon: "success",
      });
      reset();
      handleOpen();
    }
  });
}

  return (
    <>
      <Modal overflow={overflow} open={open} onClose={handleOpen}>
        <Modal.Header>
          <Modal.Title className="fw-bold text-center">
            Nuevo Producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white d-flex container">
          <form
            noValidate
            onSubmit={handleSubmit(newProduct)}
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
                  defaultValue={0}
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
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="BebidaCaliente">Bebida caliente</option>
                  <option value="BebidaFria">Bebida fría</option>
                  <option value="Dulce">Dulce</option>
                  <option value="Salado">Salado</option>
                  <option value="Lacteos">Lácteos</option>
                  <option value="Fiambres">Fiambres</option>
                </select>
                <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                  {errors.categoria?.message}
                </p>
              </fieldset>
              <fieldset className="col-12 col-md-12 mb-1">
                <label htmlFor="image-input" className="form-label">
                  Imagen
                </label>
                <input
                  type="file"
                  id="image-input"
                  className="form-control"
                  {...register("imagen", {
                    validate: {
                      isImage: (value) => {
                        if (!value[0]) {
                          return true;
                        }

                        const acceptedFormats = ["image/jpeg", "image/png"];

                        const isValidFormat = acceptedFormats.includes(
                          value[0].type
                        );

                        if (!isValidFormat) {
                          return "El formato de la imagen no es válido. Por favor, seleccione una imagen JPEG o PNG.";
                        }

                        return true;
                      },
                    },
                  })}
                />
                <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                  {errors.imagen?.message}
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
                />
                <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                  {errors.descripcion?.message}
                </p>
              </fieldset>
            </section>
            <div className="text-center mt-2">
              <Button onClick={handleReset} variant="outline-danger" size="sm">
                Cancelar
              </Button>
              <Button
                className="ms-2"
                type="submit"
                variant="outline-success"
                size="sm"
              >
                Guardar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalProdApp;
