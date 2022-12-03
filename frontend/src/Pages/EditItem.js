import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import Button from "../Components/Button";
import classes from "./AddItem.module.css";
import { URL } from "../helpers/url";
import { useHistory, useLocation, useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";

const EditItem = (props) => {
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});

  const history = useHistory();
  const context = useContext(AuthContext);
  const categories = context.categories;

  const { state } = useLocation();
  const { _id } = state.item;
  const category = state.category;

  const [selectedCategoryOption, setSelectedCategoryOption] = useState({
    value: category ? category._id : null,
    label: category ? category.name : "None",
  });

  const options = [{ value: null, label: "None" }];

  categories.forEach((cat) => {
    options.push({
      value: cat._id,
      label: cat.name,
    });
  });

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        ...state.item,
      };
    });
  }, [state.item]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const name = event.target[0].value;
    const description = event.target[1].value;
    const price = event.target[2].value;
    const image = event.target[3].value;
    const categoryId = selectedCategoryOption.value;

    const item = {
      name: name,
      description: description === "" ? null : description,
      price: price === "" ? null : price,
      image: image === "" ? null : image,
      categoryId: categoryId,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch(`${URL}/api/item/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const responseData = await response.json();
      console.log(responseData);
      history.replace("/items");
    } catch (err) {
      console.log("err ", err);
      setIsSubmitting(false);
    }
  };

  const titleChangeHandler = (event) => {
    if (event.target.value !== "" && isFormValid !== true) setIsFormValid(true);
    if (event.target.value === "") setIsFormValid(false);
    setFormData((prevData) => {
      return {
        ...prevData,
        name: event.target.value,
      };
    });
  };

  const descriptionChangeHandler = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        description: event.target.value,
      };
    });
  };

  const priceChangeHandler = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        price: event.target.value,
      };
    });
  };

  const imageChangeHandler = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        image: event.target.value,
      };
    });
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.form_control}>
          <label>Title</label>
          <input
            type="text"
            value={formData.name}
            onChange={titleChangeHandler}
          />
        </div>
        <div className={classes.form_control}>
          <label>Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={descriptionChangeHandler}
          />
        </div>
        <div className={classes.form_control}>
          <label>Price</label>
          <input
            type="text"
            value={formData.price}
            onChange={priceChangeHandler}
          />
        </div>
        <div className={classes.form_control}>
          <label>Image Link</label>
          <input
            type="text"
            value={formData.image}
            onChange={imageChangeHandler}
          />
        </div>
        <div className={classes.form_control}>
          <label>Category</label>
          <Select
            defaultValue={selectedCategoryOption}
            onChange={setSelectedCategoryOption}
            options={options}
          />
        </div>
        <Button type="submit" disabled={!isFormValid || isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditItem;
