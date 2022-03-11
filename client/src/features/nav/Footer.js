import React, { useState, useEffect } from "react";

const Footer = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/v1")
      .then((res) => res.json())
      .then((jsonres) => {
        setMessage(jsonres.message);
      });
  });

  return <p>This is a footer. {message}</p>;
};

export default Footer;
