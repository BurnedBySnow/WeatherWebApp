import "./Navbar.scss";
import searchicon from "../../assets/searchicon.svg";
import React, { forwardRef, useState } from "react";

const Navbar = (props: {
  changeSearch: (value: string) => void;
  setShowDropdown: (b: boolean) => void;
}) => {
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.relatedTarget?.className === "dropdown-container") return;
    props.setShowDropdown(false);
  };

  return (
    <div className="nav-container">
      <div className="search">
        <input
          placeholder="Search for a location"
          onChange={(e) => props.changeSearch(e.target.value)}
          onBlur={handleOnBlur}
          onFocus={() => props.setShowDropdown(true)}
        />
        <button>
          <img src={searchicon} />
        </button>
      </div>
    </div>
  );
};
export default Navbar;
