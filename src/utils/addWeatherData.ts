import { useDispatch } from "react-redux";
import getWeather from "../api/getWeather";
import { addWeather } from "../reducers/weatherSlice";
import { store } from "../store";
import { ApiWeather, WeatherData, WeatherType } from "../types";

export const addWeatherData = async (lat: number, lon: number, id: string) => {
  const weatherData = await getWeather(lat, lon);
  const tempWeather: WeatherData[] = weatherData?.properties.timeseries.map(
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
  const weatherInfo: { id: string; weather: WeatherData[] } = {
    id: id,
    weather: tempWeather,
  };
  store.dispatch(addWeather(weatherInfo));
};
