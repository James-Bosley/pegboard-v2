import React from "react";

const PlayerCard = ({ data }) => {
  const handleDragStart = (e, id) => {
    console.log(e, id);
  };

  const style = () => {
    if (data.gender === "M") {
      return { backgroundColor: "lightblue" };
    } else {
      return { backgroundColor: "pink" };
    }
  };
  return (
    <div
      style={style()}
      draggable
      onDragStart={(e) => handleDragStart(e, data.id)}
    >
      <p>{data.display_name}</p>
    </div>
  );
};

export default PlayerCard;
