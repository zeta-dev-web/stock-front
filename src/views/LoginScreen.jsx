import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../api/authApi";
import "../css/login.css";

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
						<img src="https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png" className="brand_logo" alt="Logo"/>
					</div>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form >
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="text" name="" className="form-control input_user" value="" placeholder="username"/>
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-key"></i></span>
							</div>
							<input type="password" name="" className="form-control input_pass" value="" placeholder="password"/>
						</div>
						<div className="form-group">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="customControlInline"/>
								<label className="custom-control-label" for="customControlInline">Remember me</label>
							</div>
						</div>
							<div className="d-flex justify-content-center mt-3 login_container">
				 	<button type="button" name="button" className="btn login_btn">Login</button>
				   </div>
					</form>
				</div>
		
				<div className="mt-4">
					<div className="d-flex justify-content-center links">
						Don't have an account? <a href="#" className="ml-2">Sign Up</a>
					</div>
					<div className="d-flex justify-content-center links">
						<a href="#">Forgot your password?</a>
					</div>
				</div>
			</div>
		</div>
	</div>
  
    
  );
};

export default LoginScreen;
