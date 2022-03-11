import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayers } from "../../components/players/playerSlice";
import PlayerCard from "./PlayerCard";

const SelectView = () => {
  const players = useSelector(selectPlayers);
  const dispatch = useDispatch();

  const handleGameAdd = () => {
    dispatch({ type: "game/queueGame", payload: { id: 5 } });
    dispatch({ type: "game/gameOn" });
  };

  return players.map((player) => {
    return (
      <div>
        <PlayerCard key={player.id} data={player} />
      </div>
    );
  });
};

export default SelectView;
