import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./features/nav/NavBar";
import HomePage from "./features/nav/HomePage";
import AppContainer from "./features/core-app/AppContainer";
import WaitView from "./features/core-app/WaitView";
import SelectView from "./features/core-app/SelectView";
import PlayingView from "./features/core-app/PlayingView";
import Session from "./features/users/Session";
import LoginUser from "./features/users/LoginUser";
import Profile from "./features/users/Profile";
import NewUserForm from "./features/users/NewUserForm";
import VenueInfo from "./features/users/VenueInfo";
import Footer from "./features/nav/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="app" element={<AppContainer />}>
          {/* Renders at <Outlet /> inside <AppContainer /> based on path. */}
          <Route path="select" element={<SelectView />} />
          <Route path="waiting" element={<WaitView />} />
          <Route path="playing" element={<PlayingView />} />
        </Route>
        <Route path="venue" element={<VenueInfo />} />
        <Route path="session" element={<Session />} />
        <Route path="user/login" element={<LoginUser />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="register" element={<NewUserForm />} />
        {/* Catches any incorrect paths, and renders the main App. */}
        <Route path="*" element={<AppContainer />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
