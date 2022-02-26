import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectQueue } from "../../components/games/gamesSlice";
import GameCard from "./GameCard";
import gamesActions from "../../components/games/gamesActions";

const GameView = () => {

  const games = useSelector(selectQueue);
  const dispatch = useDispatch();

  return (
    <div>
      {!games.length > 0 ? <>No Games</> : games.map(game => {
        return <GameCard data={game} />
      })}
      <button onClick={() => dispatch(gamesActions.queueGame({id:5}))}>BUTTON</button>
    </div>
  )
}; 

export default GameView;
