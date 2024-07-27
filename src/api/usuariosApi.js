const url = "frozen-romola-zetadev-601791b6.koyeb.app/api/usuarios";
const token = JSON.parse(localStorage.getItem("token")) 

const usersList = async (pagina) => {
  const resp = await fetch(url + "?desde=" + pagina, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token,
    },
  });

  const data = await resp.json();

  return data;
};

const userAdd = async (datos) => {
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await resp.json();

  return data;
};

const userUpdate = async (id, datos) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.msg);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const userDelete = async (id) => {
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

export { userAdd, usersList, userUpdate, userDelete};
