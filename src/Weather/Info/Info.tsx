import "./Info.scss";
import cloudy from "../../assets/cloudy.svg";
import {
  ApiWeather,
  Location,
  WeatherData,
  WeatherObject,
  WeatherType,
} from "../../types";
import getWeather from "../../api/getWeather";
import { useEffect, useState } from "react";
import { filter } from "../../assets/weathericons/index";
import { translateWeather } from "../../utils/translateWeather";
import { ReactComponent as Update } from "../../assets/update.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { isEmpty } from "../../utils/isEmpty";

const Info = (props: {
  location: Location;
  removeCard: (id: string) => void;
  setShowModal: (b: boolean) => void;
}) => {
  const { location, removeCard } = props;
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherObject>({
    id: "",
    weather: [],
  });
  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const weatherData = useSelector((state: RootState) => state.weather);

  const getWeatherData = () => {
    setWeather(weatherData.find((item) => item.id === location.id) ?? weather);
  };

  const setTimeIndex = () => {
    let date = new Date();
    const item = weather.weather.find(
      (item) =>
        new Date(item.date).getDate() === date.getDate() &&
        new Date(item.date).getHours() === date.getHours()
    );
    if (!item) return;
    if (date.getMinutes() < 30) {
      setIndex(weather.weather.indexOf(item));
    }
    if (date.getMinutes() > 30) {
      setIndex(weather.weather.indexOf(item) + 1);
    }
  };

  const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    removeCard(location.id);
  };

  const handleClick = () => {
    navigate(`location/${location.id}`);
  };

  useEffect(() => {
    getWeatherData();
    if (weather) setTimeIndex();
  }, [weatherData]);

  useEffect(() => {
    setTimeIndex();
  }, [weather]);

  return (
    <motion.div
      className="card"
      key={location.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      whileHover={{ scale: 1.05 }}
      transition={{
        opacity: { duration: 0.3 },
      }}
      layout
      onClick={handleClick}
    >
      <div className="location-type-container">
        <div className="card-location">
          <p>{location.name.slice(0, location.name.indexOf(","))}</p>
          <p>
            {weather.weather[index] &&
              new Date(weather.weather[index].date).getHours().toString()}
            :00
          </p>
          <div className="button-container">
            <div
              key="delete"
              style={{
                opacity: isHovering ? 1 : 0,
                transition: isHovering ? "opacity 0.2s ease-in 0.2s" : "",
              }}
              className="button-delete"
            >
              <Delete onClick={(e) => handleDelete(e)} className="delete" />
            </div>
          </div>
        </div>
        <div className="weather-type">
          {filter()[weather.weather[index]?.summary ?? "none"]}
          <p>{translateWeather()[weather.weather[index]?.summary ?? "none"]}</p>
        </div>
      </div>
      <motion.div
        className="weather-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={location.id}
      >
        <div className="card-small">
          <p>Wind m/s</p>
          <p>{weather.weather[index]?.windSpeed}</p>
        </div>
        <div className="card-small">
          <p>Temp C</p>
          <p>{weather.weather[index]?.temp}</p>
        </div>
        <div className="card-small">
          <p>Humidity %</p>
          <p>{weather.weather[index]?.humidity}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Info;
