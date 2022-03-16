import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSessionStatus } from "../../components/games/gamesSlice";
import {
  selectPlayers,
  selectSelectedPlayers,
} from "../../components/players/playerSlice";
import { alterPlayer, selectUser } from "../../components/user/userSlice";

const PlayerProfile = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSessionStatus);
  const players = useSelector(selectPlayers);
  const selectedPlayers = useSelector(selectSelectedPlayers);

  const dispatch = useDispatch();

  const [eligible, setEligible] = useState(false);
  const [display_name, setDisplayName] = useState(user.player.display_name);
  const [gender, setGender] = useState(user.player.gender);
  const [handedness, setHandedness] = useState(user.player.handedness);

  const handleChange = ({ target }) => {
    switch (target.name) {
      case "displayName":
        setDisplayName(target.value);
        break;
      case "gender":
        setGender(target.value);
        break;
      case "handedness":
        setHandedness(target.value);
        break;
      default:
        return null;
    }
  };

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

  const handleSubmitChange = () => {
    const newPlayer = {
      id: user.player.id,
      display_name,
      gender,
      handedness,
    };
    dispatch(alterPlayer(newPlayer));
  };

  return (
    <div>
      <h2 className="app-title">Manage player - {user.player.display_name}</h2>
      {!session.active ? (
        <p>There is no active session. Ask your rep to start one.</p>
      ) : (
        <h3 className="app-sub-title">Join or leave an active session</h3>
      )}
      {session.active && eligible ? (
        <div>
          <p className="inline-paragraph">Join the current session - </p>
          <button className="inline-button" onClick={handleAddToSession}>
            {session.name}
          </button>
        </div>
      ) : null}
      {players.filter((player) => player.id === user.player.id).length > 0 ? (
        <div>
          <p className="inline-paragraph">Leave the current session - </p>
          <button className="inline-button" onClick={handleRemoveFromSession}>
            {session.name}
          </button>
        </div>
      ) : null}
      <h3 className="app-sub-title">Edit your player profile</h3>
      <p>The changes will be applied when you next join a session.</p>
      <div className="login-form">
        <label>
          Display Name:
          <input
            type="text"
            name="displayName"
            onChange={handleChange}
            value={display_name}
          ></input>
        </label>
        <label>
          Gender:
          <select name="gender" onChange={handleChange} value={gender}>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </label>
        <label>
          Playing Hand:
          <select name="handedness" onChange={handleChange} value={handedness}>
            <option value="R">R</option>
            <option value="L">L</option>
          </select>
        </label>
        <button onClick={handleSubmitChange}>Submit Changes</button>
      </div>
    </div>
  );
};

export default PlayerProfile;
