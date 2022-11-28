import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { Location } from "../../types";
import { addLocationCard } from "../../utils/addLocationCard";
import "./List.scss";

const List = () => {
  const searchData = useSelector((state: RootState) => state.searchData);
  const navigate = useNavigate();

  const handleOnClick = (item: Location) => {
    localStorage.removeItem("searchData");
    addLocationCard(item);
    navigate("/");
  };

  return (
    <div className="list">
      {searchData.map((item, index) => (
        <div
          key={index}
          className="list-item"
          onClick={() => handleOnClick(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default List;
