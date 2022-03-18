import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../components/user/userSlice";

const PromptBox = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleYes = ({ target }) => {
    switch (target.dataset.env) {
      case "success-logout":
        dispatch(logOutUser());
        break;
      case "start-session":
        break;
      case "join-session":
        dispatch({ type: "player/addPlayer", payload: props.payload });
        break;
      default:
        return handleNo();
    }
    navigate(props.redirect.success);
  };

  const handleNo = () => {
    navigate(props.redirect.failure || props.removePrompt());
  };

  return (
    <div className="cover-div" onClick={handleNo}>
      <div className="prompt-box">
        <p>{props.question}</p>
        <button onClick={handleYes} data-env={props.env}>
          Yes
        </button>
        <button onClick={handleNo}>No</button>
      </div>
    </div>
  );
};

export default PromptBox;
