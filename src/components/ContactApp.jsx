import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import "../css/Carousel.css";

const ContactApp = ({ darkMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    (data);};
  const handleLink = () => {
    window.location.href = "/Error404App";
  };

  return (
    <div className="container-fluid px-1 mx-auto mt-0">
      <div className="row d-flex justify-content-center m-0 vh-100">
        <div className="col-xl-7 col-lg-8 col-md-9 col-12 text-start mt-5 pt-5">
          <div
            className={`card p-0 m-0 mt-1 pt-1 ${
              darkMode ? "form-container2" : "form-container"
            }`}
          >
            <h5 className={`text-center mb-4 mt-0 ${darkMode ? "text-white" : ""}`}>
              Contactanos
            </h5>
            <form
              noValidate
              className="text-dark p-0 m-0 px-3 pb-2 w-100"
              onSubmit={handleSubmit(onSubmit)}
            >
              <section className="row">
                <fieldset className="col-12 col-md-6 mt-1">
                  <label
                    htmlFor="name-input"
                    className={`form-label ${
                      darkMode ? "text-white" : "fw-semibold"
                    }`}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    className="form-control"
                    {...register("nombre", {
                      required: "Debe Ingresar un Nombre.",
                      minLength: {
                        value: 5,
                        message: "Su Nombre debe tener más de 5 caracteres.",
                      },
                    })}
                    required
                    minLength={5}
                    placeholder="Ingrese un nombre"
                  />
                  <div>
                    <p
                      className={`p-0 m-0 fw-semibold fst-italic ${
                        darkMode ? "text-white" : "text-danger "
                      }`}
                    >
                      {errors.nombre?.message}
                    </p>
                  </div>
                </fieldset>
                <fieldset className="col-12 col-md-6 mt-1">
                  <label
                    htmlFor="email-input"
                    className={`form-label ${
                      darkMode ? "text-white" : "fw-semibold"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    className="form-control"
                    {...register("email", {
                      required: "Debe Ingresar un Email.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:
                          "Ingrese un email válido (por ejemplo, pancito@gmail.com).",
                      },
                    })}
                    required
                    placeholder="Ingrese un email"
                  />
                  <div>
                    <p
                      className={`p-0 m-0 fw-semibold fst-italic ${
                        darkMode ? "text-white" : "text-danger "
                      }`}
                    >
                      {errors.email?.message}
                    </p>
                  </div>
                </fieldset>
                <fieldset className="col-12 col-md-12 mt-1">
                  <label
                    htmlFor="asunto-input"
                    className={`form-label ${
                      darkMode ? "text-white" : "fw-semibold"
                    }`}
                  >
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto-input"
                    className="form-control"
                    {...register("asunto", {
                      required: "Debe ingresar un Asunto.",
                    })}
                    required
                    placeholder="Ingrese un asunto"
                  />
                  <p
                    className={`p-0 m-0 fw-semibold fst-italic ${
                      darkMode ? "text-white" : "text-danger "
                    }`}
                  >
                    {errors.asunto?.message}
                  </p>
                </fieldset>
                <fieldset className="col-12 col-md-12 mt-3 mb-2 mt-1">
                  <label
                    htmlFor="description-input"
                    className={`form-label ${
                      darkMode ? "text-white" : "fw-semibold"
                    }`}
                  >
                    Consulta
                  </label>
                  <textarea
                    type="text"
                    id="description-input"
                    className="form-control"
                    {...register("descripcion", {
                      required: "Debe ingresar una descripción.",
                      minLength: {
                        value: 40,
                        message:
                          "La consulta debe tener al menos 40 caracteres.",
                      },
                      maxLength: {
                        value: 300,
                        message:
                          "La descripción no puede exceder los 300 caracteres.",
                      },
                    })}
                    required
                    minLength={40}
                    maxLength={300}
                    style={{ resize: "none" }}
                    placeholder="Escribi tu consulta..."
                  />
                  <p
                    className={`p-0 m-0 fw-semibold fst-italic ${
                      darkMode ? "text-white" : "text-danger "
                    }`}
                  >
                    {errors.descripcion?.message}
                  </p>
                </fieldset>
                <fieldset className="col-12 col-md-12 mt-3 mb-2 mt-1">
                  <Form.Group controlId="image-input">
                    <Form.Label
                      className={`form-label ${
                        darkMode ? "text-white" : "fw-semibold"
                      }`}
                    >
                      Adjuntar Imagen de Error (opcional)
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif"
                      {...register("imagen")} // Asociar con el campo "imagen" en el objeto de datos
                    />
                    <Form.Text
                      className={`${darkMode ? "text-white" : "text-muted"}`}
                    >
                      Puedes adjuntar una imagen en formato JPG, JPEG, PNG o
                      GIF.
                    </Form.Text>
                  </Form.Group>
                </fieldset>
              </section>
              <div className="text-center mt-2">
                <Button
                  onClick={handleLink}
                  className={`${
                    darkMode
                      ? "mt-1 buttoncontact2 text-dark"
                      : "mt-1 buttoncontact"
                  }`}
                  type="submit"
                  variant="success"
                  size="xl"
                >
                  Enviar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;
