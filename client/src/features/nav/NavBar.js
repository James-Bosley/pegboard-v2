import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../components/user/userSlice";

const NavBar = () => {
  const user = useSelector(selectUser);

  return (
    <div className="nav">
      <h1>PegBoard</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/app">PegBoard App</Link>
        <Link to="/venue">Venues</Link>
        {user && user.access_level === "session_rep" ? (
          <Link to="/session">Manage Session</Link>
        ) : null}
        {user ? (
          <Link to="user/profile">{user.first_name}'s Profile</Link>
        ) : (
          <Link to="user/login">Login/Register</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
