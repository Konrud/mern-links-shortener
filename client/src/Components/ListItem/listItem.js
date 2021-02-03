import React from "react";

function ListItem(props) {
    const { classNames, children } = props;
    const classes = `c-list__item${classNames ? " " + classNames : ""}`;

    return (<li className={classes}>{children}</li>);
}

export default ListItem;