import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { logInUser, selectUser } from "../../components/user/userSlice";

const LoginUser = () => {

  const user = useSelector(selectUser);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleChange = ({target}) => {
    switch(target.name) {
      case 'username':
        setUsername(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(logInUser({ username: username, password: password }));
  };
  
  if(user) {
    return (
      <Navigate to='/profile' replace />
    )
  };

  return (
    <div id="loginForm">
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input type="text" name="username" onChange={handleChange} value={username}></input>
        </label>
        <label>Password:
          <input type="password" name="password" onChange={handleChange} value={password}></input>
        </label>
        <button type="submit">Login</button>
      </form>
      <p>New to the site?</p>
      <Link to='/register'>Register Here</Link>
    </div>
  );
};

export default LoginUser;
