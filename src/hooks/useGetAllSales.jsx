import { useState, useEffect } from "react";
import { listaVentas } from "../api/ventasApi";

const useGetAllSales = (pagina = 0) => {
  const [todasLasVentas, setTodasLasVentas] = useState(null);

  const traerDatos = async () => {
    try {
      const response = await listaVentas(pagina);
      setTodasLasVentas(response);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    traerDatos();
  }, [pagina]);   return { todasLasVentas, traerDatos };
};

export default useGetAllSales;
