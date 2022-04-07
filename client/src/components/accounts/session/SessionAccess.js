import React, { useEffect, useState } from "react";
import { accessRequest, getClubs, getSessions } from "../../../util/api";

const SessionAccess = () => {
  const [clubs, setClubs] = useState(null);
  const [selectedClub, setSelectedClub] = useState("");
  const [sessions, setSessions] = useState(null);
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    const asyncEffect = async () => {
      setClubs(await getClubs());
    };
    asyncEffect();
  }, []);

  useEffect(() => {
    const asyncEffect = async () => {
      if (selectedClub) {
        setSessions(await getSessions(selectedClub));
      }
    };
    asyncEffect();
  }, [selectedClub]);

  const handleChange = ({ target }) => {
    switch (target.name) {
      case "club":
        setSelectedClub(target.value);
        if (!target.value) {
          setSessions(null);
        }
        break;
      case "session":
        setSelectedSession(target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    const response = await accessRequest({
      session_id: selectedSession,
      date_created: new Date().toJSON(),
    });
    if (response === 201) {
      return alert("Success! Request has been submitted.");
    }
    alert("Error");
  };

  return (
    <div>
      <h3 className="app-sub-title">Apply to join a session</h3>
      <p>
        Your application will be sent to the club administrator for approval.
        Make sure you meet any local requirements, such as paying a membership
        fee, before applying to join this app.
      </p>
      {clubs && (
        <table className="login-form">
          <tbody>
            <tr>
              <td>Select a club: </td>
              <td>
                <select
                  name="club"
                  value={selectedClub}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  {clubs.map((club) => {
                    return (
                      <option key={club.id} value={club.id}>
                        {club.name}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            {sessions && (
              <tr>
                <td>Select a session: </td>
                <td>
                  <select
                    name="session"
                    value={selectedSession}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    {sessions.map((session) => {
                      return (
                        <option key={session.id} value={session.id}>
                          {session.name}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
            )}
            {selectedSession && (
              <tr>
                <td>
                  <button onClick={handleSubmit}>Submit Request</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SessionAccess;
