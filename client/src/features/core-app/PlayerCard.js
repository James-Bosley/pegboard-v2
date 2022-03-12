import React from "react";

const PlayerCard = ({ data }) => {
  const handleDragStart = (e) => {
    console.log(e);
  };

  const style = () => {
    if (data.gender === "M") {
      return { backgroundColor: "lightblue" };
    } else {
      return { backgroundColor: "pink" };
    }
  };
  return (
    <div style={style()} draggable onDragStart={handleDragStart}>
      <p>{data.display_name}</p>
    </div>
  );
};

export default PlayerCard;
