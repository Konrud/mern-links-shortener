import React from "react";

function List(props) {
    const { classNames, children, renderValueFunc } = props;
    const classes = `c-list${classNames ? " " + classNames : ""}`;

    return (
        <ul className={classes}>
            {
                renderValueFunc ?
                    children.map((child) => { return renderValueFunc(child); })
                    : children
            }
        </ul>
    );
}

export default List;