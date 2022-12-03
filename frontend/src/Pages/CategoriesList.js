import React, { useContext, useEffect, useState } from "react";
import CategoryItem from "../Components/CategoryItem";
import AuthContext from "../store/auth-context";
import classes from "./CategoriesList.module.css";

const CategoriesList = (props) => {
  // const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const context = useContext(AuthContext);

  const { categories } = context;

  const { categoryHandler, isLoggedIn } = props;

  useEffect(() => {
    const getCategoriesAndItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/category");
        const responseData = await response.json();
        console.log(responseData);

        const { categories } = responseData;
        categoryHandler(categories);
        // setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };

    getCategoriesAndItems();
  }, [refresh]);

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className={classes.listContainer}>
      {categories?.map((category) => {
        return (
          <CategoryItem
            category={category}
            key={category._id}
            editable={isLoggedIn}
            rerenderCategories={refreshPage}
          />
        );
      })}
    </div>
  );
};

export default CategoriesList;
