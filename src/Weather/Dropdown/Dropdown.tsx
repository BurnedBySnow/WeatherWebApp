import "./Dropdown.scss";
import { Location } from "../../types";
import getUserLocation from "../../api/getUserLocation";
import { useEffect, useState } from "react";
import { isEmpty } from "../../utils/isEmpty";
import { Action, nanoid } from "@reduxjs/toolkit";

const Dropdown = (props: {
  setShowDropdown: (b: boolean) => void;
  addLocationCard: (item: Location) => void;
  dropdownData: Location[];
  dropdownIndex: number;
  dropdownRef: React.RefObject<HTMLDivElement>;
}) => {
  const { setShowDropdown, addLocationCard, dropdownData } = props;
  const slicedList = dropdownData.slice(0, 5);

  const hadleOnClick = (pos: Location, id: string) => {
    let newItem = {
      id: "",
      name: "",
      category: "",
      type: "",
      latitude: 0,
      longitude: 0,
    };
    newItem = {
      id: id,
      name: pos.name,
      category: pos.category,
      type: pos.type,
      latitude: pos.latitude,
      longitude: pos.longitude,
    };
    addLocationCard(newItem);
    setShowDropdown(false);
    const input: HTMLInputElement = document.getElementById(
      "search-input"
    ) as HTMLInputElement;
    input.value = "";
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
          {slicedList.map((item, index) => {
            return (
              <div
                className={`dropdown-item ${
                  index === props.dropdownIndex ? " active" : ""
                }`}
                onClick={() => hadleOnClick(item, item.id)}
              >
                <div className="dropdown-item-info">
                  <p>{item.name}</p>
                  <p>{item.type}</p>
                </div>
              </div>
            );
          })}
          <div
            className={`dropdown-item ${
              props.dropdownIndex === 5 ? " active" : ""
            }`}
          >
            <div className="dropdown-item-info last">
              See all{" (" + dropdownData.length + ")"}
            </div>
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
