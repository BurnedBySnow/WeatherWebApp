import "./Navbar.scss";
import searchicon from "../../assets/searchicon.svg";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { Location } from "../../types";
import { drop } from "lodash";

const Navbar = (props: {
  changeSearch: (value: string) => void;
  setShowDropdown: (b: boolean) => void;
  showDropdown: boolean;
  addLocationCard: (item: Location) => void;
  dropdownData: Location[];
}) => {
  const [dropdownIndex, setDropdownIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.relatedTarget?.className === "dropdown-container") return;
    props.setShowDropdown(false);
  };

  const handleKeyDown = (key: string) => {
    if (key === "ArrowUp") {
      if (dropdownIndex >= 1) setDropdownIndex(dropdownIndex - 1);
      if (dropdownIndex === 0) setDropdownIndex(5);
    }

    if (key === "ArrowDown") {
      if (dropdownIndex !== 5) setDropdownIndex(dropdownIndex + 1);
      if (dropdownIndex === 5) setDropdownIndex(0);
    }

    if (key === "Enter") {
      props.addLocationCard(props.dropdownData[dropdownIndex]);
      props.setShowDropdown(false);
      setInputValue("");
      inputRef.current.blur();
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    props.changeSearch(e.target.value);
  };

  useEffect(() => {
    document
      .getElementById("search-input")
      ?.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") e.preventDefault();
      });
  }, []);

  return (
    <div className="nav-container">
      <div className="search">
        <input
          ref={inputRef}
          id="search-input"
          className="search-input"
          placeholder="Search for a location"
          onChange={changeHandler}
          onBlur={handleOnBlur}
          onFocus={() => props.setShowDropdown(true)}
          onKeyDown={(e) => handleKeyDown(e.key)}
          value={inputValue}
        />
        <button>
          <img src={searchicon} />
        </button>
      </div>
      {props.showDropdown && (
        <Dropdown
          setShowDropdown={(b: boolean) => props.setShowDropdown(b)}
          addLocationCard={props.addLocationCard}
          dropdownData={props.dropdownData}
          dropdownIndex={dropdownIndex}
          dropdownRef={dropdownRef}
        />
      )}
    </div>
  );
};
export default Navbar;
