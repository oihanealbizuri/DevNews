import React from "react";


export const Button = ({onClick, className = '', children,}) =>
    <button className="button-inline"
            onClick={onClick}
            className={className}
            type="button"
    >{children}</button>;
