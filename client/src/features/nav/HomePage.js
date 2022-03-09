import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/v1")
      .then((res) => res.json())
      .then((jsonres) => {
        setMessage(jsonres.message);
      });
  });

  return <p>HOMEPAGE for PegBoard {message}</p>;
};

export default HomePage;
