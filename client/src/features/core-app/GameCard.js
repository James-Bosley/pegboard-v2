import React from "react";

const GameCard = (props) => {
  return (
    <div>
      <p>This is game {props.data.id}</p>
      {props.data.pairA.map((player) => {
        return <p key={player.id}>{player.display_name}</p>;
      })}
      {props.data.pairB.map((player) => {
        return <p key={player.id}>{player.display_name}</p>;
      })}
      {props.enableScore ? <div>SCORES</div> : null}
    </div>
  );
};

export default GameCard;
