import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { gameOver } from "../../components/games/gamesSlice";

const ScoreCard = ({ data }) => {
  const [pairAScore, setPairAScore] = useState();
  const [pairBScore, setPairBScore] = useState();

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
    let gameData = JSON.parse(JSON.stringify(data));
    if ((pairAScore > 20 || pairBScore > 20) && pairAScore !== pairBScore) {
      if (pairAScore > pairBScore) {
        gameData.player_id_win_1 = data.pairA[0].id;
        gameData.player_id_lose_1 = data.pairB[0].id;
        gameData.win_score = pairAScore;
        gameData.lose_score = pairBScore;
        [...data.pairA, ...data.pairB].map((player) => {
          return dispatch({ type: "player/deselectPlayer", payload: player });
        });
        if (data.pairA.length > 1) {
          gameData.player_id_win_2 = data.pairA[1].id;
          gameData.player_id_lose_2 = data.pairB[1].id;
        }
      } else {
        gameData.player_id_win_1 = data.pairB[0].id;
        gameData.player_id_lose_1 = data.pairA[0].id;
        gameData.win_score = pairBScore;
        gameData.lose_score = pairAScore;
        [...data.pairB, ...data.pairA].map((player) => {
          return dispatch({ type: "player/deselectPlayer", payload: player });
        });
        if (data.pairA.length > 1) {
          gameData.player_id_win_2 = data.pairB[1].id;
          gameData.player_id_lose_2 = data.pairA[1].id;
        }
      }
      gameData.game_status = "complete";
      gameData.time_completed = JSON.stringify(new Date());

      const idCheckItems = [
        "player_id_win_1",
        "player_id_win_2",
        "player_id_lose_1",
        "player_id_lose_2",
        "selected_by_player_id",
      ];

      idCheckItems.map((id) => {
        if (typeof gameData[id] === "string") {
          gameData[id] = 0;
          return null;
        }
        return null;
      });

      delete gameData.pairA;
      delete gameData.pairB;
      dispatch(gameOver(gameData));
      dispatch({ type: "game/gameOn" });
    } else {
      alert("Invalid Score");
    }
  };

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
      <div className="score-divider">
        <button className="select-button" onClick={handleSubmitScore}>
          Submit Score
        </button>
      </div>
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
    </div>
  );
};

export default ScoreCard;
