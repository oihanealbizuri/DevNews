import React from "react";

export const Search = ({value, buttonLabel, onChange, onSubmit}) =>
    <form onSubmit={onSubmit}>
        <input type="text"
               value={value}
               onChange={onChange}
        />
        <button className={"search-button"} type="submit">{buttonLabel}</button>
    </form>;
