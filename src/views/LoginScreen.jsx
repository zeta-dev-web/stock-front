import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../api/authApi";
import { ToastContainer, toast, Zoom } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../css/login.css";
import logo from "../assets/panadero.png";
import user from "../assets/avatar24.png";
import pass from "../assets/candado24.png";

const LoginScreen = ({ darkMode, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const inicioSesion = async (data) => {
    setLoading(true);
    const respuesta = await login(data);
    setLoginUser(respuesta);

    if (respuesta?.token) {
      localStorage.setItem("token", JSON.stringify(respuesta.token));
      navigate("/");
    }

    if (respuesta.msg) {
      notify(respuesta.msg); // Pasar la respuesta.msg en lugar de respuesta
    }

    if (respuesta && respuesta.errors) {
      respuesta.errors.forEach((error) => {
        notify2(error.msg);
      });
    }

    if (loginUser && loginUser.errors && loginUser.errors.length > 0) {
      loginUser.errors.forEach((error) => {
        notify2(error.msg);
      });
    }

    reset();
    setLoading(false);
  };

  const notify = (respuesta) =>
    toast.warn(`${respuesta}`, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "colored",
    });

  const notify2 = (respuesta) =>
    toast.error(`${respuesta}`, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "colored",
    });

  return (
    <div className="container pt-5 mt-5">
      <div className="d-flex justify-content-center h-100 pt-5">
        <div>
          <ToastContainer transition={Zoom} />
        </div>
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">
              <img src={logo} className="brand_logo" alt="Logo" />
            </div>
          </div>
          <div className="d-flex justify-content-center form_container mt-5">
            <form noValidate onSubmit={handleSubmit(inicioSesion)}>
              <div className="form-group mb-2">
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <img src={user} alt="Logo" />
                    </span>
                  </div>
                  <input
                    type="email"
                    id="Email-input"
                    className="form-control"
                    placeholder="Email"
                    {...register("email", {
                      required: "Debe ingresar su email registrado",
                      validate: {
                        validEmailFormat: (value) => {
                          if (value.match(/ /)) {
                            return "El email no debe contener espacios.";
                          }

                          if (value.length < 5) {
                            return "El email debe tener al menos 5 caracteres antes del '@'.";
                          }
                          if (!/^[^@]+@[^@]+\.com$/.test(value)) {
                            return "Ingrese un correo válido, por ejemplo taza@gmail.com";
                          }
                          return true;
                        },
                      },
                    })}
                    required
                    disabled={loading ? true : false}
                  />
                </div>
                <p className="text-danger">{errors.email?.message}</p>
              </div>
              <div className="form-group mb-2">
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <img src={pass} alt="Logo" />
                    </span>
                  </div>
                  <input
                    type="password"
                    id="password-input"
                    className="form-control"
                    placeholder="Contraseña"
                    {...register("password", {
                      required: "Debe ingresar su contraseña",
                      validate: {
                        validPasswordFormat: (value) => {
                          if (value.match(/ /)) {
                            return "La contraseña no debe contener espacios.";
                          }

                          if (value.length < 8) {
                            return "La contraseña debe tener al menos 8 caracteres.";
                          }

                          if (/[A-Z]/.test(value)) {
                            return "La contraseña no debe contener letras mayúsculas.";
                          }

                          if (/[!@#$%^&*:?¿´]/.test(value)) {
                            return "La contraseña debe contener solo letras y números.";
                          }

                          return true;
                        },
                      },
                    })}
                    required
                    disabled={loading ? true : false}
                  />
                </div>
                <p className="text-danger">{errors.password?.message}</p>
              </div>
              <div className="d-flex justify-content-center mt-3 login_container mt-5">
                <button
                  type="submit"
                  className="buttonlogin"
                  disabled={loading ? true : false}
                >
                  Iniciar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
