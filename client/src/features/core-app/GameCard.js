import React, { useState } from "react";
import ScoreCard from "./ScoreCard";

const GameCard = (props) => {
  const [gameComplete, setGameComplete] = useState(false);

  const toggleScorecard = () => {
    if (!gameComplete) {
      setGameComplete(true);
    } else {
      setGameComplete(false);
    }
  };

  const playerStyle = (gender) => {
    if (gender === "M") {
      return { backgroundColor: "lightblue" };
    } else {
      return { backgroundColor: "pink" };
    }
  };

  return (
    <div className="game-card-container">
      <div className="pair-container">
        {props.data.pairA.map((player) => {
          return (
            <p
              key={player.id}
              className="player-card"
              style={playerStyle(player.gender)}
            >
              {player.display_name}
            </p>
          );
        })}
      </div>
      <div className="divider">
        <p>- vs -</p>
        {props.enableScore ? (
          <button
            onClick={toggleScorecard}
            id="game-complete"
            className="select-button"
          >
            Complete
          </button>
        ) : null}
      </div>
      <div className="pair-container">
        {props.data.pairB.map((player) => {
          return (
            <p
              key={player.id}
              className="player-card"
              style={playerStyle(player.gender)}
            >
              {player.display_name}
            </p>
          );
        })}
      </div>
      {gameComplete ? <ScoreCard data={props.data} /> : null}
    </div>
  );
};

export default GameCard;
