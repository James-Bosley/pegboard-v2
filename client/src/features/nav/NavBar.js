import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectVenue } from "../../components/games/gamesSlice";
import { selectUser } from "../../components/user/userSlice";

const NavBar = () => {
  const venue = useSelector(selectVenue);
  const user = useSelector(selectUser);

  return (
    <div className="nav">
      <h1>PegBoard</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/app">PegBoard App</Link>
        {venue ? (
          <Link to="/venue-info">Venue</Link>
        ) : (
          <Link to="/login/venue">Venue Login</Link>
        )}
        {user ? (
          <Link to="/profile">{user.first_name}'s Profile</Link>
        ) : (
          <Link to="/login/user">Login/Register</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
