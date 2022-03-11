import React from "react";

const PlayerCard = ({ data }) => {
  const style = () => {
    if (data.gender === "M") {
      return { backgroundColor: "lightblue" };
    } else {
      return { backgroundColor: "pink" };
    }
  };
  return (
    <div style={style()}>
      <p>{data.display_name}</p>
    </div>
  );
};

export default PlayerCard;
