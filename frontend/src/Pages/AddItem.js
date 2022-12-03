import React, { useState } from "react";
import Button from "../Components/Button";
import classes from "./AddItem.module.css";
import { URL } from "../helpers/url";

const AddItem = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const name = event.target[0].value;
    const description = event.target[1].value;
    const price = event.target[2].value;
    const image = event.target[3].value;

    const item = {
      name: name,
      description: description === "" ? null : description,
      price: price === "" ? null : price,
      image: image === "" ? null : image,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch(`${URL}/api/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const responseData = await response.json();
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const titleChangeHandler = (event) => {
    if (event.target.value !== "" && isFormValid !== true) setIsFormValid(true);
    if (event.target.value === "") setIsFormValid(false);
  };

  const inputChangeHandler = () => {};

  return (
    <div className={classes.formContainer}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.form_control}>
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} />
        </div>
        <div className={classes.form_control}>
          <label>Description</label>
          <input type="text" onChange={inputChangeHandler} />
        </div>
        <div className={classes.form_control}>
          <label>Price</label>
          <input type="text" onChange={inputChangeHandler} />
        </div>
        <div className={classes.form_control}>
          <label>Image Link</label>
          <input type="text" onChange={inputChangeHandler} />
        </div>
        <Button type="submit" disabled={!isFormValid || isSubmitting}>
          Add Item
        </Button>
      </form>
    </div>
  );
};

export default AddItem;
