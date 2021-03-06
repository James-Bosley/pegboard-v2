import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { selectUser } from "../../../features/user/userSlice";
import { checkUserSession, logInUser } from "../../../util/asyncUserActions";
import "../userStyles.css";

const LoginUser = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(checkUserSession());
    }
  }, [user, dispatch]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = ({ target }) => {
    switch (target.name) {
      case "username":
        setUsername(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    dispatch(logInUser({ username, password }));
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  if (user) {
    return <Navigate to="/user/profile" replace />;
  }

  return (
    <div className="app-container">
      <h2 className="app-title">Login or Sign-up</h2>
      <table className="login-form" id="login">
        <tbody>
          <tr>
            <td>Email:</td>
            <td>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={username}
              ></input>
            </td>
            <td>New to the site?</td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={password}
              ></input>
            </td>
            <td>
              <Link className="flow-link" to="/register">
                Register Here
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <button className="form-button" onClick={handleSubmit}>
                Login
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoginUser;
