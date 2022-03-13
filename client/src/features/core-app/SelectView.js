import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSessionStatus } from "../../components/games/gamesSlice";
import { selectPlayers } from "../../components/players/playerSlice";
import { v4 } from "uuid";

const SelectView = () => {
  let players = useSelector(selectPlayers);
  const session = useSelector(selectSessionStatus);

  const dispatch = useDispatch();

  players = players.slice(0, 8);

  const [pairA, setPairA] = useState([]);
  const [pairB, setPairB] = useState([]);

  const dragItem = useRef();

  const style = (player, env) => {
    let styles = {};
    if ((pairA.includes(player) || pairB.includes(player)) && env === "queue") {
      styles = { ...styles, opacity: "50%" };
    }
    if (player.gender === "M") {
      styles = { ...styles, backgroundColor: "lightblue" };
    } else {
      styles = { ...styles, backgroundColor: "pink" };
    }
    return styles;
  };

  const handleDraggable = (id) => {
    if (pairA.includes(id) || pairB.includes(id)) {
      return false;
    }
    return true;
  };

  const handleDragStart = (e, player_id) => {
    dragItem.current = player_id;
  };

  const handleDragEnter = ({ target }) => {
    const targetPlayer = players.filter(
      (plr) => plr.id === dragItem.current
    )[0];
    switch (target.className) {
      case "pairA":
        if (
          !pairA.includes(targetPlayer) &&
          !pairB.includes(targetPlayer) &&
          pairA.length < 3
        ) {
          setPairA((state) => [...state, targetPlayer]);
        }
        if (
          !pairA.includes(targetPlayer) &&
          pairB.includes(targetPlayer) &&
          pairA.length < 3
        ) {
          setPairB((state) =>
            state.filter((player) => player !== targetPlayer)
          );
          setPairA((state) => [...state, targetPlayer]);
        }
        break;
      case "pairB":
        if (
          !pairA.includes(targetPlayer) &&
          !pairB.includes(targetPlayer) &&
          pairB.length < 3
        ) {
          setPairB((state) => [...state, targetPlayer]);
        }
        if (
          !pairB.includes(targetPlayer) &&
          pairA.includes(targetPlayer) &&
          pairB.length < 3
        ) {
          setPairA((state) =>
            state.filter((player) => player !== targetPlayer)
          );
          setPairB((state) => [...state, targetPlayer]);
        }
        break;
      case "queue":
        if (pairA.includes(targetPlayer)) {
          setPairA((state) =>
            state.filter((player) => player !== targetPlayer)
          );
        }
        if (pairB.includes(targetPlayer)) {
          setPairB((state) =>
            state.filter((player) => player !== targetPlayer)
          );
        }
        break;
      default:
        return null;
    }
  };

  const handleGameAdd = () => {
    let game = {};
    if (pairA.length === pairB.length && pairA.length > 0) {
      game.id = v4();
      game.pairA = pairA;
      game.pairB = pairB;
      game.session_id = session.id;
      game.status = "pending";
      game.selected_by = players[0].id;
      game.time_started = new Date();
    }
    dispatch({ type: "game/queueGame", payload: game });
    [...pairA, ...pairB].map((player) => {
      return dispatch({ type: "player/selectPlayer", payload: player });
    });
    dispatch({ type: "game/gameOn" });
    setPairA([]);
    setPairB([]);
  };

  return (
    <div>
      {!players.length > 0 ? (
        <p>Add players to begin choosing games</p>
      ) : (
        <div>
          <p>{players[0].display_name} to choose next game.</p>
          <div className="queue" onDragEnter={handleDragEnter}>
            {players.map((player) => {
              return (
                <div
                  draggable={handleDraggable(player)}
                  style={style(player, "queue")}
                  onDragStart={(e) => handleDragStart(e, player.id)}
                >
                  {player.display_name}
                </div>
              );
            })}
          </div>
          <div>
            <p>Drop players here</p>
            <div className="pairA" onDragEnter={handleDragEnter}>
              <p className="pairA">Pair A</p>
              {pairA.map((player) => {
                return (
                  <div
                    draggable
                    style={style(player)}
                    onDragStart={(e) => handleDragStart(e, player.id)}
                  >
                    {player.display_name}
                  </div>
                );
              })}
            </div>
            <div className="pairB" onDragEnter={handleDragEnter}>
              <p className="pairB">Pair B</p>
              {pairB.map((player) => {
                return (
                  <div
                    draggable
                    style={style(player)}
                    onDragStart={(e) => handleDragStart(e, player.id)}
                  >
                    {player.display_name}
                  </div>
                );
              })}
            </div>
            <button onClick={handleGameAdd}>Submit Game</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectView;
