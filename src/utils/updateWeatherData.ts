import { useDispatch } from "react-redux";
import getWeather from "../api/getWeather";
import { updateWeather } from "../reducers/weatherSlice";
import {
  ApiWeather,
  Location,
  WeatherData,
  WeatherObject,
  WeatherType,
} from "../types";

export const updateWeatherData = (locations: Location[]) => {
  let arr: WeatherObject[] = [];
  locations.forEach(async (item: Location) => {
    const temp = await getWeather(item.latitude, item.longitude);
    const itemWeather: WeatherData[] = temp?.properties.timeseries.map(
      (weatherItem: ApiWeather) => {
        return {
          summary: weatherItem.data.next_1_hours
            ? (weatherItem.data.next_1_hours.summary.symbol_code as WeatherType)
            : "none",
          date: weatherItem.time,
          temp: weatherItem.data.instant.details.air_temperature,
          windSpeed: weatherItem.data.instant.details.wind_speed,
          humidity: weatherItem.data.instant.details.relative_humidity,
          rainAmount: weatherItem.data.next_1_hours
            ? weatherItem.data.next_1_hours.details.precipitation_amount
            : undefined,
        };
      }
    );
    let weatherObject: WeatherObject = { id: item.id, weather: itemWeather };
    arr = [...arr, weatherObject];
  });
  return arr;
};
