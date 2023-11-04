export const obtenerClima = async (lat,long) => {
  const response = await fetch(
    `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${long}&units=metric&apikey=nG6WZfVImOpsy3Hu0cGXDHSI18eESZgJ`
  );
  const data = await response.json();

  return data
};

