import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const LoginScreen = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }, []);

  const msjalert = (mensaje, color1, color2) => {
    Toastify({
      text: mensaje,
      duration: 3000,
      gravity: "top",
      position: "center",
      style: {
        background: `linear-gradient(to right, ${color1}, ${color2})`,
      },
    }).showToast();
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    if (email == "admin@gmail.com" && password == "12345678") {
      msjalert("Inicio de Sesion con Exito", "#00b09b", "#96c93d");
      localStorage.setItem("user", JSON.stringify(email));
      setIsLoggedIn(true);
      navigate("/admin");
    } else {
      msjalert("error de credenciales", "#C90404", "#212121");
    }
  };

  return (
    <div className="container vh-100">
      <div className="row mt-5">
        <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 bg-light p-3 rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 d-grid">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 d-grid">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 d-grid">
              <button className="btn btn-success">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
