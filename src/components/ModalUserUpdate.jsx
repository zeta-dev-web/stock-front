import React, { useState, useEffect } from "react";
import { userUpdate } from "../api/usuariosApi";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ModalUserUpdate = ({ show, handleClose, usuario, setUsuario }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //cuando los datos de los inputs cambian
  const handleChange = (e) => {
    //y si es el checkbox??
    if (e.target.name === "estado") {
      setUsuario({ ...usuario, [e.target.name]: e.target.checked });
    } else {
      setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }
  };

  const actualizar = async (e) => {
    //prevenir el refresh de submit
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Seguro quiere modificar?",
        text: "No podra recuperar los datos que se reemplacen",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Guardar Cambios",
        cancelButtonText: "No, Cancelar",
      });

      if (result.isConfirmed) {
        usuario.role = "USER_ROLE";
        await userUpdate(usuario.uid, usuario);
        await Swal.fire({
          title: "Actualizacion exitosa!",
          text: "El usuario se guardó",
          icon: "success",
        });
        handleClose();
      } else {
        handleClose();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
       handleClose();
    }
  };

   const [showPassword, setShowPassword] = useState(false);

   // Función para alternar la visibilidad de la contraseña
   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="fs-5">Actualizar: {usuario?.name}</div>
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
              <label htmlFor="name-input" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="name-input"
                className="form-control"
                {...register("name", {
                  required: "Debe Ingresar un Nombre.",
                  minLength: {
                    value: 5,
                    message: "Su Nombre debe tener más de 5 caracteres.",
                  },
                })}
                required
                minLength={5}
                placeholder="Ingrese un nombre"
                value={usuario.name}
                onChange={handleChange}
              />
              <div>
                <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                  {errors.nombre?.message}
                </p>
              </div>
            </fieldset>
            <fieldset className="col-12 col-md-6 mb-1">
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
                value={usuario.email}
                onChange={handleChange}
              />
              <div>
                <p className="text-danger p-0 m-0 fw-semibold fst-italic">
                  {errors.email?.message}
                </p>
              </div>
            </fieldset>
            <fieldset className="col-12 col-md-6 mb-1">
              <label htmlFor="password-input" className="form-label">
                Contraseña
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password-input"
                  className="form-control"
                  {...register("password", {
                    required: "Debe Ingresar una Contraseña.",
                    minLength: {
                      value: 8,
                      message:
                        "La contraseña debe tener al menos 8 caracteres.",
                    },
                    pattern: {
                      value: /^[a-z0-9]+$/,
                      message:
                        "La contraseña debe contener solo letras minúsculas y números.",
                    },
                  })}
                  required
                  minLength={8}
                  placeholder="Ingrese la contraseña"
                  value={usuario.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
             <div>
  <p className="text-danger p-0 m-0 fw-semibold fst-italic">
    {errors.password?.message}
  </p>
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

export default ModalUserUpdate;
