import React, { useState } from "react";
import ScoreCard from "./ScoreCard";
import Game from "../../util/games";

const GameCard = (props) => {
  const [gameComplete, setGameComplete] = useState(false);

  const { pairA, pairB } = new Game(props.game).getPlayers();

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

  const dividerStyle = () => {
    if (pairA.length > 1) {
      return { marginTop: "50px" };
    }
  };

  return (
    <div className="game-card-container">
      <div className="pair-container">
        {pairA.map((player) => {
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
      <div className="divider" style={dividerStyle()}>
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
        {pairB.map((player) => {
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
      {gameComplete ? <ScoreCard game={props.game} /> : null}
    </div>
  );
};

export default GameCard;
