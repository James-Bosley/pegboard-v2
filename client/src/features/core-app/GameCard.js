import React, { useState } from "react";
import ScoreCard from "./ScoreCard";

const GameCard = (props) => {
  const [gameComplete, setGameComplete] = useState(false);

  const handleGameEnd = () => {
    setGameComplete(true);
  };

  const playerStyle = (gender) => {
    if (gender === "M") {
      return { backgroundColor: "lightblue" };
    } else {
      return { backgroundColor: "pink" };
    }
  };

  return (
    <div className="gameCard">
      {props.data.pairA.map((player) => {
        return (
          <p key={player.id} style={playerStyle(player.gender)}>
            {player.display_name}
          </p>
        );
      })}
      <p>- vs -</p>
      {props.data.pairB.map((player) => {
        return (
          <p key={player.id} style={playerStyle(player.gender)}>
            {player.display_name}
          </p>
        );
      })}
      {props.enableScore ? (
        <button onClick={handleGameEnd}>Game Complete</button>
      ) : null}
      {gameComplete ? <ScoreCard data={props.data} /> : null}
    </div>
  );
};

export default GameCard;
