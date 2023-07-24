import React from "react";
import "./Button.css"

export const Button = ({onClick, className = '', children,}) =>
    <button className={`${className} button-inline`}
            onClick={onClick}
            type="button"
    >{children}</button>;
