const url = "https://stock-back-z1n7.onrender.com/api/ventas";
const token = JSON.parse(localStorage.getItem("token"));

const checkToken = (token) => {
  if (!token) {
    throw new Error("No se encuentra el Token o no está definido");
  }
};

const listaVentas = async (pagina) => {
  const resp = await fetch(`${url}?desde=${pagina}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });

  if (!resp.ok) {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }

  const data = await resp.json();
  return data;
};

const traerTodasVentas = async (pagina) => {
  const resp = await fetch(`${url}?desde=${pagina}&limite=${null}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });

  if (!resp.ok) {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }

  const data = await resp.json();
  return data;
};

const agregarVenta = async (datos) => {
  checkToken(token);

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });

  if (!resp.ok) {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }

  const data = await resp.json();
  return data;
};

const actualizarVenta = async (id, datos) => {
  checkToken(token);

  const resp = await fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(datos),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });

  if (!resp.ok) {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }

  const data = await resp.json();
  return data;
};

const eliminarVenta = async (id) => {
  checkToken(token);

  const resp = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });

  if (!resp.ok) {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }

  const data = await resp.json();
  return data;
};

export { listaVentas, traerTodasVentas, actualizarVenta, eliminarVenta, agregarVenta };