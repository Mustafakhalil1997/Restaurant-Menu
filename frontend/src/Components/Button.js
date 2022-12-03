import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  const { type, onClick, style, disabled } = props;

  return (
    <button
      type={type}
      className={classes.button}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
