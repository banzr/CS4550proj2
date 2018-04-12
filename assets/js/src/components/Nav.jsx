import React from "react";
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  // TODO: stop using bootstrap for everything
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink exact to="/" activeClassName="active" className="nav-link">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to="/games" className="nav-link">
            games
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to="/login" className="nav-link">
            login
          </NavLink>
        </NavItem>
      </ul>
    </nav>
  );
}
