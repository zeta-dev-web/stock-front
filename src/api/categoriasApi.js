const url = "https://backend-62i.onrender.com/api/categorias";

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

export { categoryList };
