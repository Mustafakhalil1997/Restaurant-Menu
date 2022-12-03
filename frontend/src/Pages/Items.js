import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FoodItem from "../Components/FoodItem";
import classes from "./Items.module.css";

const Items = () => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/item");
        const responseData = await response.json();

        const { items } = responseData;
        setItems(items);
      } catch (error) {
        console.log(error);
      }
    };

    getItems();
  }, [refresh]);

  return (
    <div className={classes.itemsContainer}>
      {items.map((item) => {
        return (
          <FoodItem
            item={item}
            key={item._id}
            editable
            rerenderItems={refreshPage}
          />
        );
      })}
    </div>
  );
};

export default Items;
