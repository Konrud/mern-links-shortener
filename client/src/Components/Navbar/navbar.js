import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../../Context/authContext";
import List from "../List/list";
import ListItem from "../ListItem/listItem";

function Navbar(props) {
    const { classNames } = props;
    const authContext = useContext(AuthContext);
    const history = useHistory();

    function logoutHandler(e) {
        authContext.logout();
        history.push("/"); // redirect to the main page;
        e.preventDefault();
    }

    return (
        <nav className={`c-navbar${classNames ? " " + classNames : ""}`}>
            <a href="/" className="c-page-logo">URL Shortener</a>
            <List classNames="c-menu">
                <ListItem classNames="c-menu__item">
                    <NavLink to="/create">Create</NavLink>
                </ListItem>
                <ListItem classNames="c-menu__item">
                    <NavLink to="/links">Links</NavLink>
                </ListItem>
                <ListItem classNames="c-menu__item">
                    <a href="/" onClick={logoutHandler}>Logout</a>
                </ListItem>
            </List>
        </nav>
    );
}

export default Navbar;