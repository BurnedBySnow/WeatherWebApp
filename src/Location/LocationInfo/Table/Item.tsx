import { filter } from "../../../assets/weathericons";
import { WeatherData } from "../../../types";
import { translateWeather } from "../../../utils/translateWeather";
import "./Item.scss";

const Item = (props: { item: WeatherData }) => {
  const { item } = props;
  return (
    <div className="item">
      <div className="date">
        {new Date(item.date).getDate() +
          "/" +
          new Date(item.date).getMonth() +
          " " +
          new Date(item.date).getHours() +
          ":00"}
      </div>
      <div className="summary">{filter()[item.summary ?? "none"]}</div>
      <div className="item-category">{item.temp}</div>
      <div className="item-category">{item.rainAmount}</div>
      <div className="item-category">{item.humidity}</div>
      <div className="item-category">{item.windSpeed}</div>
    </div>
  );
};

export default Item;
