import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./FoodItem.module.css";

const FoodItem = (props) => {
  const { item, editable, rerenderItems } = props;

  const { categories } = useContext(AuthContext);

  const history = useHistory();

  const { categoryId, name, description, price, _id } = item;

  const category = categoryId
    ? categories.find((category) => category._id === categoryId)
    : null;

  const deleteItemClickHandler = async () => {
    const response = await fetch(`http://localhost:5000/api/item/${_id}`, {
      method: "DELETE",
    });

    const responseData = await response.json();
    console.log("responseData ", responseData);
    rerenderItems();
  };

  const editItemClickHandler = () => {
    history.push(`/editItem/${_id}`, {
      item,
      category,
    });
  };

  return (
    <div className={classes.item}>
      <div className={classes.textContainer}>
        <p className={classes.text}>{name}</p>
        {description && <p className={classes.text}>{description}</p>}
        {price && <p className={classes.text}>${price}</p>}
        <div className={classes.categoryContainer}>
          <p>Category: </p>
          <p>{category ? category.name : "none"}</p>
        </div>
      </div>
      {editable && (
        <div className={classes.buttonsContainer}>
          <button className={classes.button} onClick={editItemClickHandler}>
            Edit
          </button>
          <button className={classes.button} onClick={deleteItemClickHandler}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodItem;
