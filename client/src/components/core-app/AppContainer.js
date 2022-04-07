import React from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { selectSessionStatus } from "../../features/games/gamesSlice";

import "./appStyles.css";

const AppContainer = () => {
  const session = useSelector(selectSessionStatus);

  const activeStyle = { fontWeight: "bold" };

  if (!session.active) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-container">
      <h2 className="app-title">
        {session.name} @ {session.club_name}
      </h2>
      <div className="links">
        <NavLink
          className="nav-link app-link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="select"
        >
          Select Game
        </NavLink>
        <NavLink
          className="nav-link app-link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="waiting"
        >
          Games Waiting
        </NavLink>
        <NavLink
          className="nav-link app-link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="playing"
        >
          Games In Play
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default AppContainer;
