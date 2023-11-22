import React from 'react'

const CardApp = ({item,darkMode}) => {
  return (
    <div className="col-12 col-md pt-2 pt-lg-0">
      <div className="card h-100">
        <div
          className={`card-body d-flex flex-column align-items-center ${
            darkMode ? "bg-dark" : ""
          }`}
        >
          <i className={`fa ${item.icono} fa-2x text-danger pb-1`}></i>
          <p
            className={`fs-3 fs-md-3 text-center ${
              darkMode ? "text-light" : ""
            }`}
          >
            {item.texto1}
          </p>
          <p className={`text-center ${darkMode ? "text-light" : "card-text"}`}>
            {item.texto2}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardApp