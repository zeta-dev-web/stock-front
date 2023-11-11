import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Navbar2.css"

const Navbar2App = () => {
  return (
    <div>
      <section className="full-width navLateral">
        <div className="full-width navLateral-bg btn-menu"></div>
        <div className="full-width navLateral-body">
          <div className="full-width navLateral-body-logo text-center tittles">
            <i className="zmdi zmdi-close btn-menu"></i> Inventory
          </div>
          <figure className="full-width navLateral-body-tittle-menu">
            <div>
              <img
                src="assets/img/avatar-male.png"
                alt="Avatar"
                className="img-responsive"
              />
            </div>
            <figcaption>
              <span>
                Full Name Admin
                <br />
                <small>Admin</small>
              </span>
            </figcaption>
          </figure>
          <nav className="full-width">
            <ul className="full-width list-unstyle menu-principal">
              <li className="full-width">
                <a href="home.html" className="full-width">
                  <div className="navLateral-body-cl">
                    <i className="zmdi zmdi-view-dashboard"></i>
                  </div>
                  <div className="navLateral-body-cr">HOME</div>
                </a>
              </li>
              <li className="full-width divider-menu-h"></li>
              <li className="full-width">
                <a href="#!" className="full-width btn-subMenu">
                  <div className="navLateral-body-cl">
                    <i className="zmdi zmdi-case"></i>
                  </div>
                  <div className="navLateral-body-cr">ADMINISTRATION</div>
                  <span className="zmdi zmdi-chevron-left"></span>
                </a>
                <ul className="full-width menu-principal sub-menu-options">
                  <li className="full-width">
                    <a href="company.html" className="full-width">
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-balance"></i>
                      </div>
                      <div className="navLateral-body-cr">COMPANY</div>
                    </a>
                  </li>
                  <li className="full-width">
                    <a href="providers.html" className="full-width">
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-truck"></i>
                      </div>
                      <div className="navLateral-body-cr">PROVIDERS</div>
                    </a>
                  </li>
                  <li className="full-width">
                    <a href="payments.html" className="full-width">
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-card"></i>
                      </div>
                      <div className="navLateral-body-cr">PAYMENTS</div>
                    </a>
                  </li>
                  <li className="full-width">
                    <a href="categories.html" className="full-width">
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-label"></i>
                      </div>
                      <div className="navLateral-body-cr">CATEGORIES</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="full-width divider-menu-h"></li>
              <li className="full-width">
                <a href="#!" className="full-width btn-subMenu">
                  <div className="navLateral-body-cl">
                    <i className="zmdi zmdi-face"></i>
                  </div>
                  <div className="navLateral-body-cr">USERS</div>
                  <span className="zmdi zmdi-chevron-left"></span>
                </a>
                <ul className="full-width menu-principal sub-menu-options">
                  <li className="full-width">
                    <a href="admin.html" className="full-width">
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-account"></i>
                      </div>
                      <div className="navLateral-body-cr">ADMINISTRATORS</div>
                    </a>
                  </li>
                  <li className="full-width">
                    <a href="client.html" className="full-width">
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-accounts"></i>
                      </div>
                      <div className="navLateral-body-cr">CLIENT</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="full-width divider-menu-h"></li>
              <li className="full-width">
                <a href="products.html" className="full-width">
                  <div className="navLateral-body-cl">
                    <i className="zmdi zmdi-washing-machine"></i>
                  </div>
                  <div className="navLateral-body-cr">PRODUCTS</div>
                </a>
              </li>
              <li className="full-width divider-menu-h"></li>
              <li className="full-width">
                <a href="sales.html" className="full-width">
                  <div className="navLateral-body-cl">
                    <i className="zmdi zmdi-shopping-cart"></i>
                  </div>
                  <div className="navLateral-body-cr">SALES</div>
                </a>
              </li>
              <li className="full-width divider-menu-h"></li>
              <li className="full-width">
                <a href="inventory.html" className="full-width">
                  <div className="navLateral-body-cl">
                    <i className="zmdi zmdi-store"></i>
                  </div>
                  <div className="navLateral-body-cr">INVENTORY</div>
                </a>
              </li>
              <li className="full-width divider-menu-h"></li>
              <li className="full-width">
                <a href="#!" className="full-width btn-subMenu">
                  <div className="navLateral-body-cl">
                    <i className="zmdi zmdi-wrench"></i>
                  </div>
                  <div className="navLateral-body-cr">SETTINGS</div>
                  <span className="zmdi zmdi-chevron-left"></span>
                </a>
                <ul className="full-width menu-principal sub-menu-options">
                  <li className="full-width">
                    <a href="#!" className="full-width">
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-widgets"></i>
                      </div>
                      <div className="navLateral-body-cr">OPTION</div>
                    </a>
                  </li>
                  <li className="full-width">
                    <a href="#!" className="full-width">
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-widgets"></i>
                      </div>
                      <div className="navLateral-body-cr">OPTION</div>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
};
export default Navbar2App