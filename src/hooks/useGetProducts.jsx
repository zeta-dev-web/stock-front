import { useState, useEffect } from "react";
import { productsList, getAllProducts } from "../api/productsApi";

const useGetProducts = (pagina = 0) => {
  const [datos, setDatos] = useState(null);

  const traerDatos = async () => {
    const { total, productos } = await productsList(pagina);
    console.log(total);
    console.log(productos);
    setDatos({
      total,
      productos,
    });
  };

  useEffect(() => {
    // Traer datos paginados al montar el componente o cuando cambia la página
    traerDatos();
  }, [pagina]);

  return { datos,traerDatos};
};

export default useGetProducts;
