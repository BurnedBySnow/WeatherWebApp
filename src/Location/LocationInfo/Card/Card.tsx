import "./Card.scss";
import { WeatherData } from "../../../types";
import { filter } from "../../../assets/weathericons";
import { translateWeather } from "../../../utils/translateWeather";

const Card = (props: { weather: WeatherData }) => {
  const { weather } = props;

  return (
    <div className="weather-card">
      <div className="card-date">
        {new Date(weather.date).getDate() +
          "/" +
          new Date(weather.date).getMonth() +
          " " +
          new Date(weather.date).getHours() +
          ":00"}
      </div>
      <div className="card-summary">
        {filter()[weather.summary ?? "none"]}
        <p>{translateWeather()[weather.summary ?? "none"]}</p>
      </div>
      <div className="card-info-container">
        <div className="card-info">
          <p>Temp</p>
          <p>{weather.temp} &#8451;</p>
        </div>
        <div className="card-info">
          <p>Humidity</p>
          <p>{weather.humidity}%</p>
        </div>
        <div className="card-info">
          <p>Temp</p>
          <p>{weather.windSpeed} m/s</p>
        </div>
        <div className="card-info">
          <p>Temp</p>
          <p>{weather.rainAmount} mm</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
