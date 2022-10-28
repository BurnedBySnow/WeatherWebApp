import axios from "axios";

const getWeather = async (latitude: number, longitude: number) => {
  const lat = latitude.toFixed(2);
  const lon = longitude.toFixed(2);
  const result = (
    await axios.get(
      "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" +
        lat +
        "&lon=" +
        lon
    )
  ).data;
  return result;
};

export default getWeather;
