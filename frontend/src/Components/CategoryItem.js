import React from "react";
import { useHistory } from "react-router-dom";
import { URL } from "../helpers/url";
import Button from "./Button";

import classes from "./CategoryItem.module.css";

const CategoryItem = (props) => {
  const { category, editable, rerenderCategories } = props;

  const history = useHistory();

  const itemClickHandler = () => {
    history.push(`/categories/${category._id}`, {
      category,
    });
  };

  const editCategoryClickHandler = async (event) => {
    event.stopPropagation();

    history.push(`/editCategory/${category._id}`, {
      category,
    });
  };

  const deleteCategoryClickHandler = async (event) => {
    event.stopPropagation();

    try {
      const response = await fetch(`${URL}/api/category/${category._id}`, {
        method: "DELETE",
      });
      const responseData = await response.json();
      rerenderCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.itemContainer}>
      <Button onClick={itemClickHandler}>
        <p>{category.name}</p>
        {editable && (
          <div className={classes.buttonsContainer}>
            <button
              className={classes.button}
              onClick={editCategoryClickHandler}
            >
              Edit
            </button>
            <button
              className={classes.button}
              onClick={deleteCategoryClickHandler}
            >
              Delete
            </button>
          </div>
        )}
      </Button>
    </div>
  );
};

export default CategoryItem;
