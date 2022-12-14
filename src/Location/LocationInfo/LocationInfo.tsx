import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { WeatherData } from "../../types";
import { addWeatherData } from "../../utils/addWeatherData";
import { isEmpty } from "../../utils/isEmpty";
import Card from "./Card/Card";
import "./LocationInfo.scss";
import Item from "./Table/Item";

const cardVariants: Variants = {
  hidden: {
    x: window.innerWidth,
    opacity: 0,
    transition: { duration: 2, ease: "easeInOut" },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 2, ease: "easeInOut" },
  },
  exit: {
    x: -window.innerWidth + 40,
    opacity: 0,
    transition: { duration: 2, ease: "easeInOut" },
  },
};

const LocationInfo = () => {
  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState(8);
  const [direction, setDirection] = useState<"Left" | "Right">();

  const location = useLocation();
  const weather = useSelector((state: RootState) => state.weather).find(
    (item) => item.id === location.state.id
  );

  const { id } = useParams();

  useEffect(() => {
    if (weather) return;
    addWeatherData(
      location.state.latitude,
      location.state.longitude,
      location.state.id
    );
    console.log("test");
  }, []);

  return (
    <div className="location-info">
      <div className="location-info-container">
        <div className="header">{id}</div>
        <div className="item-container" id="item-container">
          <div className="top-row">
            <div className="top-row-date"></div>
            <div className="top-row-temp">temp</div>
            <div className="top-row-mm">mm</div>
            <div className="top-row-humidity">humidity</div>
            <div className="top-row-wind">wind speed</div>
          </div>
          {weather?.weather.map((item, index) => (
            <Item item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
