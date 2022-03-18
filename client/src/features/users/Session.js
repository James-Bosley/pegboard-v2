import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  loadSession,
  selectSessionStatus,
} from "../../components/games/gamesSlice";
import { selectUser, checkUserSession } from "../../components/user/userSlice";
import PromptBox from "../nav/PromptBox";
import ActiveSession from "./ActiveSession";

const Session = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSessionStatus);
  const dispatch = useDispatch();

  const [promptBox, setPromptBox] = useState();

  useEffect(() => {
    dispatch(checkUserSession());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleActivate = ({ target }) => {
    dispatch(loadSession(target.value));
    setPromptBox(true);
  };

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  return (
    <div className="app-container">
      {promptBox ? (
        <PromptBox
          env="join-session"
          question="Would you like to join the session?"
          redirect={{ success: "/app/select", failure: null }}
          removePrompt={() => setPromptBox(false)}
          payload={user.player}
        />
      ) : null}
      {session.active ? (
        <ActiveSession />
      ) : (
        <div>
          <h2 className="app-title">Start a session</h2>
          <p>
            Select a session to start. You can only start a session that you
            have been designated as session representative. If a session is
            already active on this device, you will not be able to start
            another.
          </p>
          <div className="sessions-list-container">
            {user.rep.map((repSession) => {
              if (!repSession.session_active) {
                return (
                  <label className="sessions-list-items" key={repSession.id}>
                    {repSession.name} -
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
