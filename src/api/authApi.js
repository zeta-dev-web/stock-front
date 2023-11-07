const url = "https://backend-62i.onrender.com/api/auth";

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
