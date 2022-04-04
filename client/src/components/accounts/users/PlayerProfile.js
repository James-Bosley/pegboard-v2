import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSessionStatus } from "../../../components/games/gamesSlice";
import {
  selectPlayers,
  selectSelectedPlayers,
} from "../../../components/players/playerSlice";
import { alterPlayer, selectUser } from "../../../components/user/userSlice";
import PromptBox from "../../nav/PromptBox";

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
  const [promptBox, setPromptBox] = useState(false);

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
    setPromptBox(true);
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

  const getReport = async () => {
    if (process.env.NODE_ENV === "production") {
      fetch("/v1/report/individual");
    } else {
      window.open("http://localhost:3001/v1/report/individual");
    }
  };

  return (
    <div>
      <h2 className="app-title">Player Profile - {user.player.display_name}</h2>
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
      {promptBox ? (
        <PromptBox
          env="success-logout"
          question="You have been added to the session. Would you like to log out?"
          redirect={{ success: "/app/select", failure: null }}
          removePrompt={() => setPromptBox(false)}
        />
      ) : null}
      {players.filter((player) => player.id === user.player.id).length > 0 ? (
        <div>
          <p className="inline-paragraph">Leave the current session - </p>
          <button className="inline-button" onClick={handleRemoveFromSession}>
            {session.name}
          </button>
        </div>
      ) : null}
      <h3 className="app-sub-title">Reports</h3>
      <p className="inline-paragraph">
        Individual player report for {user.player.display_name} -{" "}
      </p>
      <button className="inline-button" onClick={getReport}>
        Download Report
      </button>
      <h3 className="app-sub-title">Edit your player profile</h3>
      <p>
        This information will be seen by players using the app to select games,
        so make sure your display name is something they will recognise. Any
        changes will be applied when you next join a session.
      </p>
      <table className="login-form">
        <tr>
          <td>Display Name:</td>
          <td>
            <input
              type="text"
              name="displayName"
              onChange={handleChange}
              value={display_name}
            ></input>
          </td>
        </tr>
        <tr>
          <td>Gender:</td>
          <td>
            <select name="gender" onChange={handleChange} value={gender}>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Playing Hand:</td>
          <td>
            <select
              name="handedness"
              onChange={handleChange}
              value={handedness}
            >
              <option value="R">R</option>
              <option value="L">L</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button onClick={handleSubmitChange}>Submit Changes</button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default PlayerProfile;
