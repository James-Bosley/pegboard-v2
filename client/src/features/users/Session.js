import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  endSession,
  loadSession,
  selectSessionStatus,
} from "../../components/games/gamesSlice";
import { selectUser, checkUserSession } from "../../components/user/userSlice";

const Session = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSessionStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleActivate = ({ target }) => {
    dispatch(loadSession(target.value));
  };

  const handleDeactivate = ({ target }) => {
    dispatch(endSession(target.value));
    dispatch({ type: "player/endSession" });
    setTimeout(() => {
      dispatch(checkUserSession());
    });
  };

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  return (
    <div className="app-container">
      {session.active ? (
        <div>
          <h2 className="app-title">Manage Active Session - {session.name}</h2>
          <p>Remove player...</p>
          <label>
            End Current Session
            <button
              className="inline-button"
              onClick={handleDeactivate}
              value={session.id}
            >
              End Session
            </button>
          </label>
        </div>
      ) : (
        <div>
          <h2 className="app-title">Start a session</h2>
          <p>
            Select a session to start. You can only start a match for a session
            that you have been designated as session representative. If a
            session is already active on this device, you will not be able to
            start another session.
          </p>
          <div className="sessions-list-container">
            {user.rep.map((repSession) => {
              if (!repSession.session_active) {
                return (
                  <label className="sessions-list-items" key={repSession.id}>
                    {repSession.name}
                    <button
                      className="inline-button"
                      onClick={handleActivate}
                      value={repSession.id}
                    >
                      Start Session
                    </button>
                  </label>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Session;
