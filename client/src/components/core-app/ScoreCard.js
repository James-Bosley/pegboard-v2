import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { gameOver } from "../../features/games/gamesSlice";
import Game from "../../util/games";

const ScoreCard = (props) => {
  const [pairAScore, setPairAScore] = useState();
  const [pairBScore, setPairBScore] = useState();

  const game = new Game(props.game);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    switch (target.name) {
      case "pairA":
        setPairAScore(Number(target.value));
        break;
      case "pairB":
        setPairBScore(Number(target.value));
        break;
      default:
        return null;
    }
  };

  const handleSubmitScore = () => {
    game.setScore(pairAScore, pairBScore);
    const result = game.getSummary();
    result.playersToEnqueue.map((player) => {
      return dispatch({ type: "player/deselectPlayer", payload: player });
    });
    dispatch(gameOver(result.data));
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
        handleSubmitScore();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <div className="scorecard-container">
      <div className="score-input-container">
        <input
          className="score-input"
          placeholder="Enter Score"
          type="number"
          name="pairA"
          onChange={handleChange}
          value={pairAScore}
        ></input>
      </div>
      <div className="score-divider" />
      <div className="score-input-container">
        <input
          className="score-input"
          placeholder="Enter Score"
          type="number"
          name="pairB"
          onChange={handleChange}
          value={pairBScore}
        ></input>
      </div>
      <div className="score-button">
        <button className="select-button" onClick={handleSubmitScore}>
          Submit Score
        </button>
      </div>
    </div>
  );
};

export default ScoreCard;
