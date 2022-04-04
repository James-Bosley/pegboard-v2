import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectSessionStatus } from "../../features/games/gamesSlice";
import { selectUser } from "../../features/user/userSlice";
import "./navStyles.css";

const NavBar = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSessionStatus);

  const [showBanner, setShowBanner] = useState(true);

  const toggleBanner = () => {
    if (showBanner) {
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  };

  return (
    <div className="nav">
      <button className="toggle-banner" onClick={toggleBanner}>
        {showBanner ? <span>Hide</span> : <span>Show</span>} Menu
      </button>
      {showBanner ? (
        <div>
          <h1 className="banner">PegBoard</h1>
          <div className="links">
            <Link className="nav-link" to="/">
              Homepage
            </Link>
            {session.active ? (
              <Link className="nav-link" to="/app/select">
                PegBoard App
              </Link>
            ) : null}
            <Link className="nav-link" to="/club">
              Search Clubs
            </Link>
            {user && user.info.access_level === "session_rep" ? (
              <Link className="nav-link" to="/session">
                Manage Session
              </Link>
            ) : null}
            {user ? (
              <Link className="nav-link" to="user/profile">
                {user.info.first_name}'s Profile
              </Link>
            ) : (
              <Link className="nav-link" to="user/login">
                Login/Register
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
