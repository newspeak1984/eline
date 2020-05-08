import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">eline</Link>
      <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
        <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li className="navbar-item">
        <Link to="/createAccount" className="nav-link">Create New Account</Link>
        </li>
        <li className="navbar-item">
        <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="navbar-item">
        <Link to="/admin" className="nav-link">Admin</Link>
        </li>
        <li className="navbar-item">
        <Link to="/admin/createAccount" className="nav-link">Create Admin</Link>
        </li>
        <li className="navbar-item">
        <Link to="/admin/login" className="nav-link">Admin Login</Link>
        </li>        
      </ul>
      </div>
    </nav>
  );
}
