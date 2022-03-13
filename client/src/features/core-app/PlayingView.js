import React from "react";
import { useSelector } from "react-redux";
import { selectInPlay } from "../../components/games/gamesSlice";
import GameCard from "./GameCard";

const PlayingView = () => {
  const games = useSelector(selectInPlay);

  return (
    <div>
      {!games.length > 0 ? (
        <p>No Games</p>
      ) : (
        games.map((game) => {
          return <GameCard key={game.id} data={game} enableScore />;
        })
      )}
    </div>
  );
};

export default PlayingView;
