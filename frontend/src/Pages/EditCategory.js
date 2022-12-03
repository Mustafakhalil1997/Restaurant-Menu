import React, { useState } from "react";
import Button from "../Components/Button";
import classes from "./AddCategory.module.css";
import { URL } from "../helpers/url";
import { useLocation, useParams } from "react-router-dom";

const EditCategory = () => {
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { state } = useLocation();
  const category = state.category;

  const params = useParams();
  const _id = params.categoryId;

  const [title, setTitle] = useState(category.name);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const category = {
      name: title,
    };

    try {
      const response = await fetch(`${URL}/api/category/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      const responseData = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const titleChangeHandler = (event) => {
    if (event.target.value !== "" && isFormValid !== true) setIsFormValid(true);
    if (event.target.value === "") setIsFormValid(false);

    setTitle(event.target.value);
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.form_control}>
          <label>Title</label>
          <input type="text" value={title} onChange={titleChangeHandler} />
        </div>
        <Button type="submit" disabled={!isFormValid || isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditCategory;
