import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logOutUser, selectUser } from "../../components/user/userSlice";
import { selectSessionStatus } from "../../components/games/gamesSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSessionStatus);
  const dispatch = useDispatch();

  const handleAddToSession = () => {
    dispatch({ type: "player/addplayer", payload: user.player });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOutUser());
  };

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  return (
    <div>
      {session && user && !user.player.active_now ? (
        <div>
          <p>Add yourself to your session</p>
          <button onClick={handleAddToSession}>Join Session</button>
        </div>
      ) : null}
      <p>This is a Profile.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
