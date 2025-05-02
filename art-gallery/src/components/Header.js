import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Art Gallery
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-lg-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create">
              Add Art
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-info ms-lg-3"
              onClick={() =>
                window.open("http://localhost:3001/about.html", "_blank")
              }
            >
              About this page
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;