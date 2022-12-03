import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import classes from "./Login.module.css";

const Login = (props) => {
  const [name, setName] = useState("my name");

  const history = useHistory();

  const { loginHandler } = props;

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });

      const responseData = await response.json();

      if (response.status !== 200) {
        throw responseData.message;
      }

      const { token } = responseData;

      localStorage.setItem("token", JSON.stringify(token));

      loginHandler();
      history.replace("/categories");
    } catch (err) {
      console.log("err ", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className={classes.control}>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleChange} />
      </div>
      <button type="submit" className={classes.button}>
        Login
      </button>
    </form>
  );
};

export default Login;
