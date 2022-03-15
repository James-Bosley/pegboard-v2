import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import {
  checkUserSession,
  logInUser,
  selectUser,
} from "../../components/user/userSlice";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser({ username, password }));
  };

  if (user) {
    return <Navigate to="/user/profile" replace />;
  }

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
          ></input>
        </label>
        <button className="form-button" type="submit">
          Login
        </button>
      </form>
      <p>New to the site?</p>
      <Link className="flow-link" to="/register">
        Register Here
      </Link>
    </div>
  );
};

export default LoginUser;
