import React from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";


const BtnPagProd = ({ nextPage, backPage }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex gap-2 justify-content-center">
          <button className="btn btn-secondary" onClick={backPage}>
            <GrFormPreviousLink />
          </button>
          <button className="btn btn-warning" onClick={nextPage}>
            <GrFormNextLink />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BtnPagProd;