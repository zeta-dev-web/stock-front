import React from "react";
import { Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import imagen01 from "../assets/01.jpg";
import imagen02 from "../assets/2.jpg";

import "../css/Carousel.css";

const ContactApp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm({
    mode: "onChange", // Validar al cambiar el formulario
  });

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade vh-100"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner container-carousel vh-100">
        <div className="carousel-item active">
          <img src={imagen01} className="d-block w-100 vh-100" alt="chatgpt" />
        </div>
        <div className="carousel-item">
          <img src={imagen02} className="d-block w-100 vh-100" alt="chatgpt" />
        </div>
        <div className="card">
          <div className="h-100 d-flex flex-column align-items-center justify-content-center text-white p-3">
            <form noValidate className="bg-light text-dark p-0 m-0 rounded ">
              <section className="row">
                <fieldset className="col-12 col-md-6 mb-1 mt-2 ms-2">
                  <label htmlFor="name-input" className="form-label">
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
                    <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                      {errors.nombre?.message}
                    </p>
                  </div>
                </fieldset>
                <fieldset className="col-12 col-md-6 mt-2 ms-2 mb-1">
                  <label htmlFor="email-input" className="form-label">
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
                    <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                      {errors.email?.message}
                    </p>
                  </div>
                </fieldset>
                <fieldset className="col-12 col-md-6 mb-1">
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
                    placeholder="Escribi tu consulta..."
                  />
                  <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                    {errors.descripcion?.message}
                  </p>
                </fieldset>
              </section>
              <div className="text-center mt-2">
                <Button
                  className="ms-2"
                  type="submit"
                  variant="outline-success"
                  size="sm"
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
