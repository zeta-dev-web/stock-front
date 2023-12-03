import { useState, useEffect } from "react";
import { usersList } from "../api/usuariosApi";

const useGetAllUsers = (pagina = 0) => {
  const [datos, setDatos] = useState(null);

  const traerDatos = async () => {
    const { total, usuarios } = await usersList(pagina);
    setDatos({
      total,
      usuarios
    });
  };

  useEffect(() => {
    // Traer datos paginados al montar el componente o cuando cambia la página
    traerDatos();
  }, [pagina]);

  return { datos, traerDatos };
};

export default useGetAllUsers;
