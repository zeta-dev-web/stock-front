import { useState, useEffect } from "react";
import { traerTodasVentas } from "../api/ventasApi";

const useGetAllSales = (pagina = 0) => {
  const [todasLasVentas, setTodasLasVentas] = useState(null);

  const traerDatos = async () => {
    try {
      const response = await traerTodasVentas(pagina);
      setTodasLasVentas(response);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    // Traer todos los productos al montar el componente
    traerDatos();
  }, [pagina]); // Se ejecutará solo una vez al montar el componente o cuando cambie la página

  console.log(todasLasVentas);
  return { todasLasVentas, traerDatos };
};

export default useGetAllSales;
