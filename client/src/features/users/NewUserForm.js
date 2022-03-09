import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    switch (target.name) {
      case "firstName":
        setFirstName(target.value);
        break;
      case "lastName":
        setLastName(target.value);
        break;
      case "email":
        setEmail(target.value);
        break;
      case "telephone":
        setTelephone(target.value);
        break;
      case "birthDate":
        setBirthDate(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      default:
        return null;
    }
  };

  const formBundler = () => {
    return {
      first_name: firstName,
      last_name: lastName,
      email_address: email,
      phone_number: telephone,
      date_of_birth: birthDate,
      password: password,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = formBundler();
    const response = await fetch(`/api/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    if (response.ok) {
      alert("Success! Please login to continue.");
      navigate("/login/user");
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
            name="firstName"
            onChange={handleChange}
            value={firstName}
          ></input>
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={lastName}
          ></input>
        </label>
        <label>
          Email Address:
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={email}
          ></input>
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="telephone"
            onChange={handleChange}
            value={telephone}
          ></input>
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="birthDate"
            onChange={handleChange}
            value={birthDate}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewUserForm;
