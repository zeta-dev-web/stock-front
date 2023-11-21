import React from "react";
import { Link } from "react-router-dom";
import "../css/Error404.css";

const Error404App = () => {
  return (
    <section class="page_404 d-flex justify-content-center p-0 m-0">
      <div className="w-100">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Parece que te perdiste</h3>
                  <p>la página a la que quieres acceder no esta disponible</p>
                  <Link to="/" className="link_404">
                    Regresar al Inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error404App;
