const url = "https://stock-back-dev-ttgk.4.us-1.fl0.io/api/ventas";
const token = JSON.parse(localStorage.getItem("token")) 
;

const listaVentas = async (pagina) => {
  const resp = await fetch(url + "?desde=" + pagina, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await resp.json();

  return data;
};
const traerTodasVentas = async (pagina) => {
  const resp = await fetch(`${url}?desde=${pagina}&limite=${null}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await resp.json();

  return data;
};
const agregarVenta = async (datos) => {
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });

  const data = await resp.json();
  return data;
};

const actualizarVenta = async (id, datos) => {
  const resp = await fetch(url + "/" + id, {
    method: "PUT",
    body: JSON.stringify(datos),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });
  const data = await resp.json();
  return data;
};

const eliminarVenta = async (id) => {
  const resp = await fetch(url + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });
  const data = await resp.json();
  return data;
};

export { listaVentas, traerTodasVentas, actualizarVenta, eliminarVenta, agregarVenta  };