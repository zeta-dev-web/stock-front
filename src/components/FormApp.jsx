import React from "react";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const FormApp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const newProduct = (data) => {                    
    console.log(data);
  };

  const Alerta = (mensaje) => {
    Toastify({
      text: mensaje,
      duration: 1500,
      gravity: "top",
      position: "right",
    }).showToast();
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(newProduct)}
      className="bg-light text-dark p-3 rounded w-100"
    >
      <h1 className="text-center">Formulario</h1>
      <section className="row">
        <fieldset className="col-12 col-md-6 mb-2">
          <label htmlFor="nameProduct-input" className="form-label">
            Nombre del producto
          </label>
          <input
            type="text"
            id="nameProduct-input"
            className="form-control"
            {...register("nombre", {
              required: "Debe Ingresar un Nombre",
              minLength: {
                value: 3,
                message: "Su Nombre debe tener mas de 3 caracteres",
              },
              maxLength: {
                value: 15,
                message: "Su Nombre debe maximo 15 caracteres",
              },
            })}
            required
            minLength={3}
            maxLength={20}
          />
          <div>
            {errors.nombre?.message ? Alerta(errors.nombre.message) : ""}
          </div>
        </fieldset>
        <fieldset className="col-12 col-md-6 mb-2">
          <label htmlFor="Price-input" className="form-label">
            Precio
          </label>
          <input
            type="number"
            id="Price-input"
            className="form-control"
            {...register("precio", {
              required: "Debe Ingresar un Precio",
              min: {
                value: 1,
                message: "Su Nombre debe tener mas de 3 caracteres",
              },
              max: {
                value: 20,
                message: "Su Nombre debe maximo 15 caracteres",
              },
            })}
            required
            min={1}
            max={10000}
          />
          <p className="text-danger">error</p>
        </fieldset>
        <fieldset className="col-12 col-md-6 mb-2">
          <label htmlFor="image-input" className="form-label">
            Imagen
          </label>
          <input
            type="text"
            id="image-input"
            className="form-control"
            required
          />
          <p className="text-danger">error</p>
        </fieldset>
        <fieldset className="col-12 col-md-6 mb-2">
          <label htmlFor="category-input" className="form-label">
            Categoria
          </label>
          <select className="form-control" id="category-input" required>
            <option value="">Seleccione una categoria</option>
            <option value="Bebida caliente">Bebida caliente</option>
            <option value="Bebida fria">Bebida fria</option>
            <option value="Dulce">Dulce</option>
            <option value="Salado">Salado</option>
          </select>
          <p className="text-danger">error</p>
        </fieldset>
        <fieldset className="col-12 mb-2">
          <label htmlFor="description-input" className="form-label">
            Descripción
          </label>
          <textarea
            type="text"
            id="description-input"
            className="form-control"
            required
            minLength={15}
            maxLength={300}
          />
          <p className="text-danger">error</p>
        </fieldset>
      </section>
      <div className="text-end">
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default FormApp;
