import { useState } from "react";
import "./App.css";
import CategoriesList from "./Pages/CategoriesList";
import MainHeader from "./Components/MainHeader";

import { Redirect, Route, Switch } from "react-router-dom";
import Items from "./Pages/Items";
import Login from "./Pages/Login";
import AuthContext from "./store/auth-context";
import CategoryItems from "./Pages/CategoryItems";
import AddItem from "./Pages/AddItem";
import EditItem from "./Pages/EditItem";
import AddCategory from "./Pages/AddCategory";
import EditCategory from "./Pages/EditCategory";

const token = localStorage.getItem("token");

function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return token ? true : false;
  });

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const categoryHandler = (categories) => {
    setCategoryList(categories);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        categories: categoryList,
      }}
    >
      <MainHeader isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      <Switch>
        {!isLoggedIn && (
          <Route path="/login">
            <Login loginHandler={loginHandler} />
          </Route>
        )}
        <Route path="/" exact>
          <Redirect exact to="/categories" />
        </Route>

        <Route exact path="/categories">
          <CategoriesList
            categoryHandler={categoryHandler}
            isLoggedIn={isLoggedIn}
          />
        </Route>
        <Route path="/categories/:categoryId">
          <CategoryItems />
        </Route>
        {isLoggedIn && (
          <Route path="/items">
            <Items />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/addItem">
            <AddItem />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/addCategory">
            <AddCategory />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/editCategory/:categoryId">
            <EditCategory />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/editItem/:itemId">
            <EditItem />
          </Route>
        )}

        <Route path="*">
          <Redirect exact to="/categories" />
        </Route>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;

{
  /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
}
