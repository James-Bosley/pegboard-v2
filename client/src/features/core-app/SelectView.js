import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSessionStatus } from "../../components/games/gamesSlice";
import { selectPlayers } from "../../components/players/playerSlice";
import Game from "../../util/games";

const SelectView = () => {
  let players = useSelector(selectPlayers);
  const session = useSelector(selectSessionStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "game/gameOn" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  players = players.filter((plr) => plr !== null);
  const activePlayers = players.slice(0, 9);
  const extraPlayers = players.slice(9);

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
    if (env === "extra") {
      styles = { ...styles, backgroundColor: "rgba(211,211,211,0.5)" };
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
    const targetPlayer = activePlayers.filter(
      (plr) => plr.id === dragItem.current
    )[0];
    switch (target.dataset.dropvalue) {
      case "pairA":
        if (
          !pairA.includes(targetPlayer) &&
          !pairB.includes(targetPlayer) &&
          pairA.length < 2
        ) {
          setPairA((state) => [...state, targetPlayer]);
        }
        if (
          !pairA.includes(targetPlayer) &&
          pairB.includes(targetPlayer) &&
          pairA.length < 2
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
          pairB.length < 2
        ) {
          setPairB((state) => [...state, targetPlayer]);
        }
        if (
          !pairB.includes(targetPlayer) &&
          pairA.includes(targetPlayer) &&
          pairB.length < 2
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
    const game = new Game({
      session_id: session.id,
      select_id: activePlayers[0].id,
    });
    game.setPairA(pairA);
    game.setPairB(pairB);
    dispatch({ type: "game/queueGame", payload: game.getState() });
    [...pairA, ...pairB].map((player) => {
      return dispatch({ type: "player/selectPlayer", payload: player });
    });
    setPairA([]);
    setPairB([]);
  };

  return (
    <div className="outlet-container">
      {!activePlayers.length > 0 ? (
        <p className="placeholder">Add players to begin choosing games</p>
      ) : (
        <div className="selectview-container">
          <p>
            <strong>{activePlayers[0].display_name}</strong> to choose game from
            first 9 players
          </p>
          <div
            data-dropvalue="queue"
            className="queue-container"
            onDragEnter={handleDragEnter}
          >
            {activePlayers.map((player) => {
              return (
                <div
                  key={player.id}
                  className="player-card draggable-card"
                  data-dropvalue="queue"
                  draggable={handleDraggable(player)}
                  style={style(player, "queue")}
                  onDragStart={(e) => handleDragStart(e, player.id)}
                >
                  {player.display_name}
                </div>
              );
            })}
          </div>
          <p>Drop players into their teams</p>
          <div className="dropzone-container">
            <div
              data-dropvalue="pairA"
              className="dropzone"
              onDragEnter={handleDragEnter}
            >
              <p data-dropvalue="pairA">Side A</p>
              {pairA.map((player) => {
                return (
                  <div
                    key={player.id}
                    className="player-card draggable-card"
                    data-dropvalue="pairA"
                    draggable
                    style={style(player)}
                    onDragStart={(e) => handleDragStart(e, player.id)}
                  >
                    {player.display_name}
                  </div>
                );
              })}
            </div>
            <div
              data-dropvalue="pairB"
              className="dropzone"
              onDragEnter={handleDragEnter}
            >
              <p data-dropvalue="pairB">Side B</p>
              {pairB.map((player) => {
                return (
                  <div
                    key={player.id}
                    className="player-card draggable-card"
                    data-dropvalue="pairB"
                    draggable
                    style={style(player)}
                    onDragStart={(e) => handleDragStart(e, player.id)}
                  >
                    {player.display_name}
                  </div>
                );
              })}
            </div>
          </div>
          <button className="select-button" onClick={handleGameAdd}>
            Submit Game
          </button>
          {extraPlayers.length > 0 ? (
            <div>
              <p>
                Remaining players in the queue - not availiable for selection
              </p>
              <div id="extra-players" className="queue-container">
                {extraPlayers.map((player) => {
                  return (
                    <div
                      key={player.id}
                      className="player-card"
                      style={style(player, "extra")}
                    >
                      {player.display_name}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SelectView;
