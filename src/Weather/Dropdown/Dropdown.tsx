import "./Dropdown.scss";
import { Location } from "../../types";
import getUserLocation from "../../api/getUserLocation";
import { useEffect, useState } from "react";
import { isEmpty } from "../../utils/isEmpty";
import { Action, nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { addLocationCard } from "../../utils/addLocationCard";
import { useNavigate } from "react-router-dom";

const Dropdown = (props: {
  setShowDropdown: (b: boolean) => void;
  setDropdownIndex: (n: number) => void;
  dropdownIndex: number;
  dropdownRef: React.RefObject<HTMLDivElement>;
  setInputValue: (value: string) => void;
  handleSeeAllClick: () => void;
}) => {
  const { setShowDropdown, setInputValue } = props;

  const dropdownData = useSelector((state: RootState) => state.searchData);
  const navigate = useNavigate();

  const hadleOnClick = (item: Location) => {
    addLocationCard(item);
    setShowDropdown(false);
    setInputValue("");
    navigate("/");
  };

  const currentPosClick = async () => {
    const posInfo = await getUserLocation();
    let newItem = {
      id: "",
      name: "",
      category: "",
      type: "",
      latitude: 0,
      longitude: 0,
    };
    if (posInfo === undefined) return;
    newItem = {
      id: nanoid(),
      name: posInfo.city + ",",
      category: "place",
      type: "city",
      latitude: posInfo.lat,
      longitude: posInfo.lon,
    };
    addLocationCard(newItem);
    setShowDropdown(false);
    props.setDropdownIndex(-1);
    navigate("/");
  };

  return (
    <div
      id="dropdown"
      className="dropdown-container"
      tabIndex={0}
      ref={props.dropdownRef}
    >
      {!isEmpty(dropdownData) ? (
        <div className="dropdown-item-wrapper">
          {dropdownData.slice(0, 5).map((item, index) => {
            return (
              <div
                key={index}
                className={`dropdown-item ${
                  index === props.dropdownIndex ? " active" : ""
                }`}
                onClick={() => hadleOnClick(item)}
              >
                <div className="dropdown-item-info">
                  <p>{item.name.slice(0, item.name.indexOf(","))}</p>
                  <p>{item.name.slice(item.name.indexOf(" "))}</p>
                </div>
              </div>
            );
          })}
          <div
            className={`dropdown-item all${
              props.dropdownIndex === dropdownData.slice(0, 5).length
                ? " active"
                : ""
            }`}
          >
            {dropdownData.length > 5 && (
              <div
                className="dropdown-item-info last"
                onClick={props.handleSeeAllClick}
              >
                See all{" (" + dropdownData.length + ")"}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="dropdown-item userpos"
          onClick={() => currentPosClick()}
        >
          <div className="dropdown-item-info userpos">
            Your current location
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
