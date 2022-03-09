import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../components/user/userSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "user/logOut" });
  };

  if (!user) {
    return <Navigate to="/login/user" replace />;
  }

  return (
    <div>
      <p>This is a Profile.</p>
      <button onClick={handleSubmit}>Logout</button>
    </div>
  );
};

export default Profile;
