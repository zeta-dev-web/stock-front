const url = "https://stock-back-z1n7.onrender.com/api/auth";
const token = localStorage.getItem("token") || null;

export const login = async (datos) => {
  const res = await fetch(url + "/login", {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const info = await res.json();

  return info;
};

export const obtenerDatosAuth = async (token) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });

  const info = await res.json();

  return info;
};
