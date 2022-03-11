import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectSessionStatus } from "../../components/games/gamesSlice";

const AppShell = () => {
  const session = useSelector(selectSessionStatus);

  return (
    <div>
      <p>{session.name}</p>
      <Link to="select">Game Selection</Link>
      <Link to="waiting">Games Waiting</Link>
      <Link to="playing">Games In Play</Link>
      <Outlet />
    </div>
  );
};

export default AppShell;
