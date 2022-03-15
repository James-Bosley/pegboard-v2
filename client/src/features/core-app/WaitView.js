import React from "react";
import { useSelector } from "react-redux";
import { selectQueue } from "../../components/games/gamesSlice";
import GameCard from "./GameCard";

const WaitView = () => {
  const games = useSelector(selectQueue);

  return (
    <div>
      {!games.length > 0 ? (
        <p className="placeholder">No Games</p>
      ) : (
        games.map((game) => {
          return <GameCard key={game.id} data={game} />;
        })
      )}
    </div>
  );
};

export default WaitView;
