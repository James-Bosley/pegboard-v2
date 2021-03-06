import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectSessionStatus } from "../../../features/games/gamesSlice";
import { selectUser } from "../../../features/user/userSlice";
import { checkUserSession, logOutUser } from "../../../util/asyncUserActions";
import PromptBox from "../../nav/PromptBox";
import PlayerProfile from "./PlayerProfile";
import SessionAccess from "../session/SessionAccess";

const Profile = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSessionStatus);
  const dispatch = useDispatch();

  const [promptBox, setPromptBox] = useState(false);

  useEffect(() => {
    if (user.info.access_level === "session_rep" && !session.active) {
      setPromptBox(true);
    }
    dispatch(checkUserSession());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = (e) => {
    dispatch(logOutUser());
  };

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  return (
    <div className="app-container">
      {promptBox ? (
        <PromptBox
          env="start-session"
          question="Would you like to start a session?"
          redirect={{ success: "/session", failure: null }}
          removePrompt={() => setPromptBox(false)}
        />
      ) : null}
      <h2 className="app-title">{user.info.first_name}'s Profile</h2>
      <p>Information about {user.info.first_name}...</p>
      <button onClick={handleLogout}>Logout</button>
      <PlayerProfile />
      <SessionAccess />
    </div>
  );
};

export default Profile;
