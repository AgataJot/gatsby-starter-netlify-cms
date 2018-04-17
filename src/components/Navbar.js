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
      <nav className="navbar is-transparent">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image">
                <h1 className="has-text-weight-bold is-size-1">W</h1>
              </figure>
            </Link>
            <div
              class={`navbar-burger burger ${this.getStatus()}`}
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

          <div class={`navbar-menu ${this.getStatus()}`}>
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
