import React, { useEffect } from 'react'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import FormApp from '../components/FormApp';

const AdminScreen = ({darkMode}) => {
useEffect(() => {
Toastify({
  text: "Bienvenido al Panel de Admin",
  duration: 3000,
  gravity: "top",
  position: "center",
}).showToast();  
}, [])

    return (
    <div>
      <h1 className={`text-center ${darkMode ? "text-light" : ""}`}>
        Pagina Admin
      </h1>
      <h3>Agregar Producto</h3>
      <FormApp></FormApp>
    </div>
  );
}

export default AdminScreen