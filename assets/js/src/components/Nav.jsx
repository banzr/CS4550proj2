import React from "react";
import { NavItem, Navbar } from "reactstrap";
import { NavLink } from "react-router-dom";

export default function Nav({ profile }) {
  let session_info;
  if (!profile) {
    session_info = (
      <NavItem>
        <NavLink exact to="/login" className="nav-link rightLink">
          Login
        </NavLink>
      </NavItem>
    );
  } else {
    session_info = <h5 style={{ color: "white" }}>Welcome, {profile.name}</h5>;
  }
  
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand colorNav navUl">
      <a className="navbar-brand">
        <img
          src="images/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
      </a>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink exact to="/" activeClassName="active" className="nav-link">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to="/games" className="nav-link">
            Games
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to="/privacy" className="nav-link">
            Privacy
          </NavLink>
        </NavItem>
      </ul>
      <ul className="navbar-nav ml-auto">{session_info}</ul>
    </nav>
  );
}
