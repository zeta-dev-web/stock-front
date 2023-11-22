const url = "https://stock-back-dev-ttgk.4.us-1.fl0.io/api/categorias";

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
