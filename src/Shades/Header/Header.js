import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import profileImg from "../../Assets/Images/Icons/useravatar.jpg";

const Header = () => {
  const [user, setUser] = useState({});
  return (
    <section className="header">
      <nav
        className="navbar navbar-expand-md navbar-light  container-lg px-lg-0 px-1 px-sm-5"
        id="navbar-light"
      >
        <div className="container-fluid ">
          <div className="logo">
            <NavLink to="/" className="navbar-brand" href="#">
              GcomWorld.com
            </NavLink>
          </div>
          <button
            className="navbar-toggler  ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="mobile-nav-list d-block d-md-none ms-1 "
            id="NNNnavbarSupportedContent"
          >
            <ul className=" d-flex ms-auto mb-2 mb-lg-0">
              {true && (
                <>
                  <li className="nav-item user pt-1">
                    <NavLink className="nav-link" to="/dashboard/my_account">
                      <img
                        src={
                          user?.profilePicture
                            ? `${process.env.REACT_APP_SERVER_HOST_URL}/${user.profilePicture}`
                            : profileImg
                        }
                        alt=""
                      />
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 header-ul">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard/my_account" className="nav-link">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/registation" className="nav-link">
                  Registation
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/ecommerce" className="nav-link">
                  E-commerce
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className="nav-link">
                  Products
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to="/ofiice" className="nav-link">
                  Offices
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink to="/about_us" className="nav-link">
                  About Us
                </NavLink>
              </li>
              {true && (
                <>
                  <li className="nav-item user d-none d-md-block">
                    <NavLink className="nav-link" to="/dashboard/my_account">
                      <img
                        src={
                          user?.profilePicture
                            ? `${process.env.REACT_APP_SERVER_HOST_URL}/${user.profilePicture}`
                            : profileImg
                        }
                        alt=""
                      />
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
