import { useState, useEffect } from "react";
import { productsList, getAllProducts } from "../api/productsApi";

const useGetProducts = (pagina = 0) => {
  const [datos, setDatos] = useState(null);
  const [todosLosProductos, setTodosLosProductos] = useState(null);

  const traerDatos = async () => {
    const { total, productos } = await productsList(pagina);
    setDatos({
      total,
      productos,
    });
  };

  const traerTodosLosProductos = async () => {
    const todosProductos = await getAllProducts();
    setTodosLosProductos(todosProductos);
  };

  useEffect(() => {
    // Traer datos paginados al montar el componente o cuando cambia la página
    traerDatos();
  }, [pagina]);

  useEffect(() => {
    // Traer todos los productos al montar el componente
    traerTodosLosProductos();
  }, []); // Se ejecutará solo una vez al montar el componente

  return { datos, todosLosProductos, traerDatos, traerTodosLosProductos };
};

export default useGetProducts;
