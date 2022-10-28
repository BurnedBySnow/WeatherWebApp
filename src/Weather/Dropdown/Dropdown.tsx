import "./Dropdown.scss";
import { Location } from "../../types";
import getUserLocation from "../../api/getUserLocation";
import { useEffect } from "react";
import { isEmpty } from "../../utils/isEmpty";
import { nanoid } from "@reduxjs/toolkit";

const Dropdown = (props: {
  setShowDropdown: (b: boolean) => void;
  addLocationCard: (item: {
    id: string;
    name: string;
    category: string;
    type: string;
    latitude: number;
    longitude: number;
  }) => void;
  dropdownData: Location[];
}) => {
  const { setShowDropdown, addLocationCard, dropdownData } = props;

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
    <div className="dropdown-container" tabIndex={0}>
      {!isEmpty(dropdownData) ? (
        dropdownData.map((item) => {
          return (
            <div
              className="dropdown-item"
              onClick={() => hadleOnClick(item, item.id)}
            >
              <div className="dropdown-item-info">{item.name}</div>
            </div>
          );
        })
      ) : (
        <div className="dropdown-item" onClick={() => currentPosClick()}>
          <div className="dropdown-item-info">Your current location</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
