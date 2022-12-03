import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
// import AuthContext from "../store/auth-context";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const { isLoggedIn, logoutHandler } = props;

  // const context = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <div style={{ display: "flex", alignItems: "center" }}>
            <li>
              <NavLink activeClassName={classes.active} to="/categories">
                Categories
              </NavLink>
            </li>

            {isLoggedIn && (
              <li>
                <NavLink activeClassName={classes.active} to="/items">
                  Items
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink activeClassName={classes.active} to="/addItem">
                  Add Item
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink activeClassName={classes.active} to="/addCategory">
                  Add Category
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink activeClassName={classes.active} to="/editCategories">
                  Edit Categories
                </NavLink>
              </li>
            )}
          </div>

          {!isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/login">
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink
                activeClassName={classes.active}
                to="/login"
                onClick={logoutHandler}
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
