import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  checkUserSession,
  logOutUser,
  selectUser,
} from "../../components/user/userSlice";
import { selectSessionStatus } from "../../components/games/gamesSlice";
import {
  selectPlayers,
  selectSelectedPlayers,
} from "../../components/players/playerSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSessionStatus);
  const players = useSelector(selectPlayers);
  const selectedPlayers = useSelector(selectSelectedPlayers);
  const dispatch = useDispatch();

  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    dispatch(checkUserSession());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          const checkArray = selectedPlayers.filter(
            (player) => player.id === user.player.id
          );
          if (checkArray.length === 0) {
            return setEligible(true);
          }
        }
      }
    }
    setEligible(false);
  }, [user, players, selectedPlayers, session]);

  const handleAddToSession = () => {
    dispatch({ type: "player/addPlayer", payload: user.player });
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
          <p>Add yourself to the current session - {session.name}</p>
          <button onClick={handleAddToSession}>Join Session</button>
        </div>
      ) : null}
      {players.filter((player) => player.id === user.player.id).length > 0 ? (
        <div>
          <p>Remove yourself from {session.name}</p>
          <button onClick={handleRemoveFromSession}>Leave Session</button>
        </div>
      ) : null}
      <p>This is a Profile.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
