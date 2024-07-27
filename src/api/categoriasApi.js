const url = "https://frozen-romola-zetadev-601791b6.koyeb.app/api/categorias";
const token = JSON.parse(localStorage.getItem("token")) 

const categoryList = async () => {
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await resp.json();

  return data;
};

const categoryAdd = async (datos) => {
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

const categoryDelete = async (id) => {
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

const categoryUpdate = async (id, datos) => {
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

export { categoryList, categoryAdd, categoryDelete, categoryUpdate };
