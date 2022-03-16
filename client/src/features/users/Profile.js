import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  checkUserSession,
  logOutUser,
  selectUser,
} from "../../components/user/userSlice";
import PlayerProfile from "./PlayerProfile";
import SessionProfile from "./SessionProfile";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOutUser());
  };

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  return (
    <div className="app-container">
      <PlayerProfile />
      <SessionProfile />
      <h2 className="app-title">{user.info.first_name}'s Profile</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
