import { useState, useEffect } from "react";
import { productsList, getAllProducts } from "../api/productsApi";


const useGetAllProducts = (pagina = 0) => {
  const [todosLosProductos, setTodosLosProductos] = useState(null);

  const traerTodosLosProductos = async () => {
    const response = await getAllProducts(pagina);
    setTodosLosProductos(response);
  };

  useEffect(() => {
    // Traer todos los productos al montar el componente
    traerTodosLosProductos();
  }, [pagina]); // Se ejecutará solo una vez al montar el componente

  return { todosLosProductos, traerTodosLosProductos };
};

export default useGetAllProducts