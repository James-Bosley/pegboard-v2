import React from "react";
import { Link, Outlet } from "react-router-dom";

const AppShell = () => {
  return (
    <div>
      <p>This is the AppShell</p>
      <Link to="players">Players</Link>
      <Link to="games">Games</Link>
      <Outlet />
    </div>
  );
};

export default AppShell;
