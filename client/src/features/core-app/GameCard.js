import React from "react";

const GameCard = (props) => {
  const playerStyle = (gender) => {
    if (gender === "M") {
      return { backgroundColor: "lightblue" };
    } else {
      return { backgroundColor: "pink" };
    }
  };

  return (
    <div className="gameCard">
      <p>This is game {props.data.id}</p>
      {props.data.pairA.map((player) => {
        return (
          <p key={player.id} style={playerStyle(player.gender)}>
            {player.display_name}
          </p>
        );
      })}
      {props.data.pairB.map((player) => {
        return (
          <p key={player.id} style={playerStyle(player.gender)}>
            {player.display_name}
          </p>
        );
      })}
      {props.enableScore ? <div>SCORES</div> : null}
    </div>
  );
};

export default GameCard;
