import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../api/authApi";
import "../css/login.css";
import logo from "../assets/panadero.png"
import user from "../assets/avatar24.png"
import pass from "../assets/candado24.png"

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
    alert(respuesta.msg)
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
						<img src={logo} className="brand_logo" alt="Logo"/>
					</div>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form >
						<div className="input-group mb-4">
							<div className="input-group-append">
								<span className="input-group-text"><img src={user} alt="Logo"/></span>
							</div>
							<input type="text" name="" className="form-control input_user" value="" placeholder="Email"/>
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><img src={pass} alt="Logo"/></span>
							</div>
							<input type="password" name="" className="form-control input_pass" value="" placeholder="Contraseña"/>
						</div>
							<div className="d-flex justify-content-center mt-3 login_container mt-5">
				 	<button type="button" name="button" className="btn login_btn ">Iniciar Sesión</button>
				   </div>
					</form>
				</div>
			</div>
		</div>
	</div>
  
    
  );
};

export default LoginScreen;
