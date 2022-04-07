import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewUser } from "../../../util/api";

const NewUserForm = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email_address, setEmail] = useState("");
  const [phone_number, setTelephone] = useState("");
  const [date_of_birth, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const options = {
      first_name: setFirstName,
      last_name: setLastName,
      email_address: setEmail,
      phone_number: setTelephone,
      date_of_birth: setBirthDate,
      password: setPassword,
    };
    options[target.name](target.value);
  };

  const userTemplate = () => {
    const newUser = {
      first_name,
      last_name,
      email_address,
      phone_number,
      date_of_birth,
      password,
      member_since: new Date(),
    };
    return newUser;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = userTemplate();
    const response = await addNewUser(userData);
    if (response.status === 201) {
      alert("Success! Please login to continue.");
      navigate("/user/login");
    } else {
      alert("Error");
    }
  };

  return (
    <div id="newUserForm">
      <p>Welcome! Complete the form below to register for PegBoard.</p>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            onChange={handleChange}
            value={first_name}
            required
            autoFocus
          ></input>
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            onChange={handleChange}
            value={last_name}
            required
          ></input>
        </label>
        <label>
          Email Address:
          <input
            type="text"
            name="email_address"
            onChange={handleChange}
            value={email_address}
            required
          ></input>
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            onChange={handleChange}
            value={phone_number}
            required
          ></input>
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="date_of_birth"
            onChange={handleChange}
            value={date_of_birth}
            required
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewUserForm;
