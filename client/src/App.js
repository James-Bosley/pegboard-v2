import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import HomePage from "./components/nav/HomePage";
import AppContainer from "./components/core-app/AppContainer";
import WaitView from "./components/core-app/WaitView";
import SelectView from "./components/core-app/SelectView";
import PlayingView from "./components/core-app/PlayingView";
import ManageSession from "./components/accounts/session/ManageSession";
import LoginUser from "./components/accounts/users/LoginUser";
import Profile from "./components/accounts/users/Profile";
import NewUserForm from "./components/accounts/users/NewUserForm";
import ClubInfo from "./components/accounts/venue/ClubInfo";
import Footer from "./components/nav/Footer";

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
        <Route path="club" element={<ClubInfo />} />
        <Route path="session" element={<ManageSession />} />
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
