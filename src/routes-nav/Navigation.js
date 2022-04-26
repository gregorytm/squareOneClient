import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCurrentUser } from "../auth/UserContext";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup Forms
 *
 * Rendered by App
 */

function Navigation({ logout }) {
  const currentUser = useCurrentUser();

  function LoggedInAdmin() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/projects/active">
            Projects
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/employee/personnel">
            Employees
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={logout}>
            Log out {currentUser.lastName || currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function LoggedInManager() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/projects/active">
            Projects
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={logout}>
            Log out {currentUser.lastName || currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function LoggedInUser() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/projects/active">
            Projects
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={logout}>
            Log out {currentUser.lastName || currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function LoggedOutNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-link mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-link mr-4">
          <NavLink className="nav-link" to="/signup">
            Signup
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
      {!currentUser ? (
        <LoggedOutNav />
      ) : currentUser.role === "admin" ? (
        <LoggedInAdmin />
      ) : currentUser.role === "manager" ? (
        <LoggedInManager />
      ) : (
        <LoggedInUser />
      )}
    </nav>
  );
}

export default Navigation;
