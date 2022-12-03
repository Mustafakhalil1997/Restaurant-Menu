import React, { useState } from "react";
import Button from "../Components/Button";
import classes from "./AddCategory.module.css";
import { URL } from "../helpers/url";

const AddCategory = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const name = event.target[0].value;
    const category = {
      name,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch(`${URL}/api/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      const responseData = await response.json();
      console.log(responseData);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const titleChangeHandler = (event) => {
    if (event.target.value !== "" && isFormValid !== true) setIsFormValid(true);
    if (event.target.value === "") setIsFormValid(false);
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.form_control}>
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} />
        </div>
        <Button type="submit" disabled={!isFormValid || isSubmitting}>
          Add Category
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
