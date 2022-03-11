import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectSessionStatus } from "../../components/games/gamesSlice";
import { selectUser } from "../../components/user/userSlice";

const NavBar = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSessionStatus);

  return (
    <div className="nav">
      <h1>PegBoard</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {session.active ? <Link to="/app/select">PegBoard App</Link> : null}
        <Link to="/venue">Venues</Link>
        {user && user.info.access_level === "session_rep" ? (
          <Link to="/session">Manage Session</Link>
        ) : null}
        {user ? (
          <Link to="user/profile">{user.info.first_name}'s Profile</Link>
        ) : (
          <Link to="user/login">Login/Register</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
