import { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import "sweetalert2/src/sweetalert2.scss";
import { Modal } from "rsuite";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

const ModalUserApp = ({ open, handleOpen }) => {
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
     text: "No podra recuperar el producto que no se guardó",
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
 };

 const [showPassword, setShowPassword] = useState(false);

 // Función para alternar la visibilidad de la contraseña
 const togglePasswordVisibility = () => {
   setShowPassword(!showPassword);
 };


  return (
    <>
      <Modal overflow={overflow} open={open} onClose={handleOpen}>
        <Modal.Header>
          <Modal.Title className="fw-bold text-center">
            Nuevo Usuario
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
                    {...register("contrasena", {
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
                    {errors.contrasena?.message}
                  </p>
                </div>
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

export default ModalUserApp;
