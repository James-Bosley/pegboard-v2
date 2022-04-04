import React from "react";
import { useSelector } from "react-redux";
import { selectQueue } from "../../features/games/gamesSlice";
import GameCard from "./GameCard";

const WaitView = () => {
  const games = useSelector(selectQueue);

  return (
    <div>
      {!games.length > 0 ? (
        <p className="placeholder">No Games</p>
      ) : (
        games.map((game, i) => {
          return <GameCard key={game.id} game={game} />;
        })
      )}
    </div>
  );
};

export default WaitView;
