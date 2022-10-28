import "./Info.scss";
import cloudy from "../../assets/cloudy.svg";
import { ApiWeather, Location, WeatherData } from "../../types";
import getWeather from "../../api/getWeather";
import { useEffect, useState } from "react";
import { filter } from "../../assets/weathericons/index";
import { translateWeather } from "../../utils/translateWeather";
import { ReactComponent as Update } from "../../assets/update.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { AnimatePresence, motion } from "framer-motion";

const Info = (props: {
  location: Location;
  removeCard: (id: string) => void;
  setShowModal: (b: boolean) => void;
}) => {
  const { location, removeCard } = props;
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const getWeatherData = async () => {
    const weatherData = await getWeather(location.latitude, location.longitude);

    const tempWeather: WeatherData[] = weatherData?.properties.timeseries.map(
      (item: ApiWeather) => {
        return {
          summary: item.data.next_1_hours
            ? item.data.next_1_hours.summary.symbol_code
            : undefined,
          date: new Date(item.time),
          temp: item.data.instant.details.air_temperature,
          windSpeed: item.data.instant.details.wind_speed,
          humidity: item.data.instant.details.relative_humidity,
          rainAmount: item.data.next_1_hours
            ? item.data.next_1_hours.details.precipitation_amount
            : undefined,
        };
      }
    );

    if (tempWeather) setWeather(tempWeather);
  };

  const handleUpdate = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    removeCard(location.id);
  };

  const handleClick = () => {
    props.setShowModal(true);
  };

  useEffect(() => {
    getWeatherData();
  }, []);
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
          <div className="button-container">
            <div
              key="update"
              style={{
                opacity: isHovering ? 1 : 0,
                transition: isHovering ? "all 0.2s ease-in 0.2s" : "",
              }}
              className="button-update"
            >
              <Update onClick={(e) => handleUpdate(e)} className="update" />
            </div>
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
          {/* <img id="img" src={images.default.} /> */}
          {filter()[weather[0]?.summary ?? "none"]}
          <p>{translateWeather()[weather[0]?.summary ?? "none"]}</p>
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
          <p>Wind</p>
          <p>{weather[0]?.windSpeed}</p>
        </div>
        <div className="card-small">
          <p>Temp</p>
          <p>{weather[0]?.temp}</p>
        </div>
        <div className="card-small">
          <p>Humidity</p>
          <p>{weather[0]?.humidity}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Info;
