import "./Navbar.scss";
import searchicon from "../../assets/searchicon.svg";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { Location } from "../../types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setSearchData } from "../../reducers/searchSlice";
import { addLocationCard } from "../../utils/addLocationCard";

const Navbar = (props: {
  changeSearch: (value: string) => void;
  setShowDropdown: (b: boolean) => void;
  showDropdown: boolean;
}) => {
  const [dropdownIndex, setDropdownIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const navigate = useNavigate();
  const path = useLocation();

  const dropdownData = useSelector((state: RootState) => state.searchData);
  const dispatch = useDispatch();

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.relatedTarget?.className === "dropdown-container") return;
    props.setShowDropdown(false);
    setDropdownIndex(-1);
  };

  const handleKeyDown = (key: string) => {
    const lastValue = dropdownData.slice(0, 5).length;
    if (key === "ArrowUp") {
      if (dropdownIndex > 0) setDropdownIndex(dropdownIndex - 1);
      if (dropdownIndex === 0) setDropdownIndex(lastValue);
    }

    if (key === "ArrowDown") {
      if (dropdownIndex === -1) setDropdownIndex(0);
      if (dropdownIndex !== lastValue) setDropdownIndex(dropdownIndex + 1);
      if (dropdownIndex === lastValue) setDropdownIndex(0);
    }

    if (key === "Enter") {
      if (
        dropdownRef.current?.children[0].children[
          dropdownIndex
        ].className.includes("userpos")
      ) {
        props.setShowDropdown(false);
        setDropdownIndex(-1);
        setInputValue("");
        inputRef.current.blur();
        navigate(
          `/location/search/${dropdownData[0].name.slice(
            0,
            dropdownData[0].name.indexOf(",")
          )}`
        );
      } else {
        addLocationCard(dropdownData[dropdownIndex]);
        dispatch(setSearchData([]));
        props.setShowDropdown(false);
        setDropdownIndex(-1);
        setInputValue("");
        inputRef.current.blur();
        if (path.pathname.includes("search")) navigate("/");
      }
    }

    if (key === "Backspace" && inputValue === "" && path.pathname === "/") {
      dispatch(setSearchData([]));
    }
  };

  const handleSeeAllClick = () => {
    props.setShowDropdown(false);
    setDropdownIndex(-1);
    setInputValue("");
    inputRef.current.blur();
    navigate(
      `/location/search/${dropdownData[0].name.slice(
        0,
        dropdownData[0].name.indexOf(",")
      )}`
    );
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    props.changeSearch(e.target.value);
    setDropdownIndex(-1);
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
          setDropdownIndex={(n: number) => setDropdownIndex(n)}
          dropdownIndex={dropdownIndex}
          dropdownRef={dropdownRef}
          setInputValue={(value: string) => setInputValue(value)}
          handleSeeAllClick={handleSeeAllClick}
        />
      )}
    </div>
  );
};
export default Navbar;
