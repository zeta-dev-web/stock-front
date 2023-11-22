import { useState, useEffect } from "react";
import { productsList, getAllProducts } from "../api/productsApi";


const useGetAllProducts = () => {
  const [todosLosProductos, setTodosLosProductos] = useState(null);

  const traerTodosLosProductos = async () => {
    const response = await getAllProducts();
    setTodosLosProductos(response);
  };

  useEffect(() => {
    // Traer todos los productos al montar el componente
    traerTodosLosProductos();
  }, []); // Se ejecutará solo una vez al montar el componente

  return {todosLosProductos, traerTodosLosProductos}
}

export default useGetAllProducts