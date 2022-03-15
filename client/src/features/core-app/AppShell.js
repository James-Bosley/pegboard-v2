import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { selectSessionStatus } from "../../components/games/gamesSlice";
import "./appStyles.css";

const AppShell = () => {
  const session = useSelector(selectSessionStatus);

  const activeStyle = { fontWeight: "bold" };

  return (
    <div className="app-container">
      <h3 className="app-title">
        {session.name} @ {session.club_name}
      </h3>
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

export default AppShell;
