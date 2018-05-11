import React, { PureComponent } from "react";
import Link from "gatsby-link";

import github from "../img/github-icon.svg";
import logo from "../img/logo.svg";

class Navbar extends PureComponent {
  state = {
    isActive: false
  };
  getStatus = () => {
    const STATES = { true: "is-active", false: "" };
    return STATES[this.state.isActive];
  };
  render() {
    return (
      <nav className="wk-nav">
        <div className="container">
          <Link to="/" className="wk-header">
            <div className="wk-logo-img" />
            <h1 className="is-size-1 has-text-light">Vilkometria</h1>
            <h2 className="is-size-4 has-text-grey-light">
              Handmade in Poland
            </h2>
          </Link>
        </div>
      </nav>
    );
    return (
      <nav className="navbar is-dark" style={{ backgroundColor: "inherit" }}>
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image">
                <h1 className="is-size-1 has-text-light">Vilkometria</h1>
                <h2 className="is-size-4 has-text-grey-light">
                  Handmade in Poland
                </h2>
              </figure>
            </Link>
            <div
              className={`navbar-burger burger ${this.getStatus()}`}
              data-target="navMenuDocumentation"
              onClick={() =>
                this.setState(prevState => ({ isActive: !prevState.isActive }))
              }
            >
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className={`navbar-menu ${this.getStatus()}`}>
            <div className="navbar-start" />
            <div className="navbar-end">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/products">
                Products
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
