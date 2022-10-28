import axios from "axios";
import { ApiLocation } from "../types";

const getLocations = async (value: string): Promise<ApiLocation> => {
  value = value.replaceAll(" ", "+");

  const result = (
    await axios.get(
      "https://nominatim.openstreetmap.org/search?q=" +
        value +
        "&format=geojson&limit=10"
    )
  ).data;
  return result;
};

export default getLocations;
