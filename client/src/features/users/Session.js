import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  endSession,
  loadSession,
  selectSessionStatus,
} from "../../components/games/gamesSlice";
import { selectUser } from "../../components/user/userSlice";

const Session = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSessionStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleActivate = ({ target }) => {
    dispatch(loadSession(target.value));
    navigate("/app/select");
  };

  const handleDeactivate = ({ target }) => {
    dispatch(endSession(target.value));
  };

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  return (
    <div>
      {session.active ? (
        <div>
          <h2>Manage Active Session - {session.name}</h2>
          <p>Remove player...</p>
          <label>
            End Current Session
            <button onClick={handleDeactivate} value={session.id}>
              End Session
            </button>
          </label>
        </div>
      ) : (
        <div>
          <h2>Start a session</h2>
          <p>
            Select a session to start. You can only start a match for a session
            that you have been designated as session representative. If a
            session is already active on this device, you will not be able to
            start another session.
          </p>
          {user.rep.map((repSession) => {
            if (!repSession.session_active) {
              return (
                <label>
                  {repSession.name}
                  <button onClick={handleActivate} value={repSession.id}>
                    Start Session
                  </button>
                </label>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default Session;
