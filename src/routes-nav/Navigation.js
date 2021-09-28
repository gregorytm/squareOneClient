import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Navigation bar for site. d
 *
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/projects">
            Projects
          </NavLink>
        </li>
        {/* <li className="nav-item mr-4">
          <Navlink className="nav-link" to="/projects/reports">
            Projecet Reports
          </Navlink>
        </li> */}
        {/* <li className="nav-item mr-4">
          <Navlink className="nav-link" to="/employees">
            Employees
          </Navlink>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out{currentUser.first_inital || currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-link mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            New Employee signup
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        SquareOne
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation;
