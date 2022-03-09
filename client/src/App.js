import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./features/nav/NavBar";
import HomePage from "./features/nav/HomePage";
import AppShell from "./features/core-app/AppShell";
import GameView from "./features/core-app/GameView";
import PlayerView from "./features/core-app/PlayerView";
import LoginVenue from "./features/users/LoginVenue";
import LoginUser from "./features/users/LoginUser";
import Profile from "./features/users/Profile";
import NewUserForm from "./features/users/NewUserForm";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="app" element={<AppShell />}>
          <Route path="players" element={<PlayerView />} />
          <Route path="games" element={<GameView />} />
        </Route>
        <Route path="login/venue" element={<LoginVenue />} />
        <Route path="login/user" element={<LoginUser />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<NewUserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
