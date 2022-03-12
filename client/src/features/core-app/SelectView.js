import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayers } from "../../components/players/playerSlice";
import PlayerCard from "./PlayerCard";

const SelectView = () => {
  const loadPlayers = useSelector(selectPlayers);
  const dispatch = useDispatch();

  const availaiblePlayers = loadPlayers.filter((player) => !player.selected);

  const playerState = [
    { state: "Players to Select", players: availaiblePlayers },
    { state: "Pair One", players: [] },
    { state: "Pair Two", players: [] },
  ];

  const [players, setPlayers] = useState(playerState);

  const style = (gender) => {
    if (gender === "M") {
      return { backgroundColor: "lightblue" };
    } else {
      return { backgroundColor: "pink" };
    }
  };

  const handleDragStart = (e) => {
    console.log("Dragging");
  };

  const handleGameAdd = () => {
    dispatch({ type: "game/queueGame", payload: { id: 5 } });
    dispatch({ type: "game/gameOn" });
  };

  return (
    <div>
      <p>Drag players to the gamebuilder to choose a game.</p>
      <div>
        {players.map((cat) => {
          return (
            <div key={cat.state}>
              <h3>{cat.state}</h3>
              {cat.players.map((player) => {
                return (
                  <div
                    key={player.id}
                    style={style(player.gender)}
                    draggable
                    onDragStart={handleDragStart}
                  >
                    <p>{player.display_name}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectView;
