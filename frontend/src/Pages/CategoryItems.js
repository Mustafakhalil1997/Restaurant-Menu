import React from "react";
import { useParams, useLocation } from "react-router-dom";
import FoodItem from "../Components/FoodItem";
import classes from "./CategoryItems.module.css";

const CategoryItems = (props) => {
  const params = useParams();
  const { state } = useLocation();

  const { items, name } = state.category;

  return (
    <div>
      <div className={classes.pageContainer}>
        <p className={classes.categoryTitle}>{name}</p>
      </div>
      <div className={classes.itemsContainer}>
        {items.map((item) => {
          return <FoodItem item={item} key={item._id} />;
        })}
      </div>
    </div>
  );
};

export default CategoryItems;
