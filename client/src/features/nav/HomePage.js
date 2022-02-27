import React, { useEffect, useState } from "react";

const HomePage = () => {

  const [message, setMessage] = useState('')

  useEffect(()=> {
    fetch('/api')
    .then((res) => res.json())
    .then((jsonres) => {
      setMessage(jsonres.message)})
  })

  return (
    <p>HOMEPAGE {message}</p>
  )
};

export default HomePage;
