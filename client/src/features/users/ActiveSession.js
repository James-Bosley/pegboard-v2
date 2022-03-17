import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  endSession,
  selectSessionStatus,
} from "../../components/games/gamesSlice";
import { selectPlayers } from "../../components/players/playerSlice";
import { checkUserSession } from "../../components/user/userSlice";
import { v4 } from "uuid";

const ActiveSession = () => {
  const session = useSelector(selectSessionStatus);
  const players = useSelector(selectPlayers);

  const dispatch = useDispatch();

  const [display_name, setDisplayName] = useState("");
  const [gender, setGender] = useState("M");
  const [handedness, setHandedness] = useState("R");

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

  const addVisitor = () => {
    const player = {
      id: v4(),
      display_name: display_name + " (Visitor)",
      gender,
      handedness,
    };
    dispatch({ type: "player/addPlayer", payload: player });
  };

  const handleDeactivate = ({ target }) => {
    dispatch(endSession(target.value));
    dispatch({ type: "player/endSession" });
    setTimeout(() => {
      dispatch(checkUserSession());
    });
  };

  return (
    <div>
      <h2 className="app-title">Manage Active Session - {session.name}</h2>
      <h3 className="app-sub-title">Remove a player</h3>
      <div></div>
      <h3 className="app-sub-title">Add a visitor</h3>
      <p>Enter visitors details</p>
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
            <button onClick={addVisitor}>Create Visitor</button>
          </td>
        </tr>
      </table>
      <h3 className="app-sub-title">End the session</h3>
      <div>
        <p className="inline-paragraph">
          Warning! This will also remove all players logged into the session -{" "}
        </p>
        <button
          className="inline-button"
          onClick={handleDeactivate}
          value={session.id}
        >
          End Session - {session.name}
        </button>
      </div>
    </div>
  );
};

export default ActiveSession;
