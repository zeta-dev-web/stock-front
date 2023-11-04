import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const generarInforme = () => {
//   return new Promise((resolve, reject) => {
//     let informe = null;
//     setTimeout(() => {
//       informe = true;
//       if (informe) {
//         resolve("recibimos el informe");
//       } else {
//         reject("error en la entrega");
//       }
//     }, 2000);
//   });
// };

// generarInforme()
//   .then((respuesta) => alert("informe recibido"))
//   .catch((error) => alert("error en la entrega"));

//http
//get trae informacion
//post guarda informacion
//put actualizar informacion
//delete borrar informacion

// promesa para usar API  - usando FETCH
// fetch(
//   "https://api.tomorrow.io/v4/weather/realtime?location=tucuman&apikey=nG6WZfVImOpsy3Hu0cGXDHSI18eESZgJ"
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// // https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=nG6WZfVImOpsy3Hu0cGXDHSI18eESZgJ

//METODO ASYNC

// const obtenerClima = async () => {
//   const response = await fetch(
//     "https://api.tomorrow.io/v4/weather/realtime?location=tucuman&apikey=nG6WZfVImOpsy3Hu0cGXDHSI18eESZgJ"
//   );
//   const data = await response.json();

//   return data
// };
// //ejecuto la funcion
// obtenerClima().then((respuesta)=>
// {const {data} = respuesta
// const { values } = data;
// console.log(values);
// })
