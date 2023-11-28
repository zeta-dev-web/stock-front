import React from 'react'
import { GrFormNextLink} from "react-icons/gr";
import {GrFormPreviousLink } from "react-icons/gr";
const ButtonPage = ({ backPage, nextPage, isNextDisabled, isBackDisabled}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex gap-2 justify-content-center">
          <button
            className="btn btn-warning"
            onClick={backPage}
            disabled={isBackDisabled}
          >
            <GrFormPreviousLink />
          </button>
          <button
            className="btn btn-warning"
            onClick={nextPage}
            disabled={isNextDisabled}
          >
            <GrFormNextLink />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonPage