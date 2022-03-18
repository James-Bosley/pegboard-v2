import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInPlay } from "../../components/games/gamesSlice";
import GameCard from "./GameCard";

const PlayingView = () => {
  const games = useSelector(selectInPlay);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "game/gameOn" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  return (
    <div className="outlet-container">
      {!games.length > 0 ? (
        <p className="placeholder">No Games</p>
      ) : (
        games.map((game) => {
          return <GameCard key={game.id} data={game} enableScore />;
        })
      )}
    </div>
  );
};

export default PlayingView;
