import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logOutUser, selectUser } from "../../components/user/userSlice";
import { selectSessionStatus } from "../../components/games/gamesSlice";
import { selectPlayers } from "../../components/players/playerSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSessionStatus);
  const players = useSelector(selectPlayers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [eligible, setEligable] = useState(false);

  useEffect(() => {
    if (user && user.player) {
      const checkSession = user.sessions.filter(
        (userSession) => session.id === userSession.id
      );
      if (checkSession.length > 0) {
        const checkArray = players.filter(
          (player) => player.id === user.player.id
        );
        if (checkArray.length === 0) {
          return setEligable(true);
        }
      }
    }
    setEligable(false);
  }, [user, players, session]);

  const handleAddToSession = () => {
    dispatch({ type: "player/addPlayer", payload: user.player });
    navigate("/app");
  };

  const handleRemoveFromSession = () => {
    dispatch({ type: "player/removePlayer", payload: user.player });
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
      {!session.active ? (
        <p>There is no active session. Ask your rep to start one.</p>
      ) : null}
      {!eligible && session.active ? (
        <p>
          You are not able to add yourself to the active session. This is
          because you are already logged in or you are not a member.
        </p>
      ) : null}
      {session.active && eligible ? (
        <div>
          <p>Add yourself to the current session</p>
          <button onClick={handleAddToSession}>Join Session</button>
        </div>
      ) : null}
      {eligible ? (
        <div>
          <p>Remove yourself from the session</p>
          <button onClick={handleRemoveFromSession}>Leave Session</button>
        </div>
      ) : null}
      <p>This is a Profile.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
