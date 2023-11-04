import React from 'react'

const ErrorScreen = ({darkMode}) => {
  return (
    <div>
      <h1 className={`text-center ${darkMode ? "text-light" : ""}`}>
        Pagina no encontrada
      </h1>
    </div>
  );
}

export default ErrorScreen