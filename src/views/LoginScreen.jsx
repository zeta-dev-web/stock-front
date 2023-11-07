import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../api/authApi";
import "../css/login.css";
import logo from "../assets/panadero.png";
import user from "../assets/avatar24.png";
import pass from "../assets/candado24.png";

const LoginScreen = () => {
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
    console.log(respuesta);
    alert(respuesta.msg);
    setLoginUser(respuesta);
    reset();
    setLoading(false);

    if (respuesta?.token) {
      localStorage.setItem("token", JSON.stringify(respuesta.token));
      navigate("/");
    }
  };

  return (
    <div className="container p-0 mt-5">
      <div className="d-flex justify-content-center h-100 pt-5">
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">
              <img src={logo} className="brand_logo" alt="Logo" />
            </div>
          </div>
          <div className="d-flex justify-content-center form_container">
            <form noValidate onSubmit={handleSubmit(inicioSesion)}>
              <div className="input-group mb-4">
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
                    required: "Este campo es requerido",
                  })}
                  required
                  disabled={loading ? true : false}
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>
              <div className="input-group mb-2">
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
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^.{8,16}$/i,
                      message: "La Contraseña debe tener 8 caracteres mínimos",
                    },
                  })}
                  required
                  disabled={loading ? true : false}
                />
                <p className="text-danger">{errors.password?.message}</p>
              </div>
              <div className="d-flex justify-content-center mt-3 login_container mt-5">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading ? true : false}
                >
                  Iniciar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loginUser?.msg && (
        <div className="row mt-3">
          <div className="col">
            <div className="alert alert-danger" role="alert">
              {loginUser.msg}
            </div>
          </div>
        </div>
      )}
      {loginUser?.errors && (
        <div className="row mt-3">
          {loginUser.errors.map((error, index) => (
            <div className="col" key={index}>
              <div className="alert alert-danger" role="alert">
                {error.msg}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
