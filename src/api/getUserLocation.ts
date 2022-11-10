import axios from "axios";
import { UserLocation } from "../types";

interface Position {
  city: string;
  county: string;
  country: string;
  lat: number;
  lon: number;
}

const options = {
  enableHighAccuracy: true,
};

const getUserLocation = async () => {
  let location: Position = {
    city: "",
    county: "",
    country: "",
    lat: 0,
    lon: 0,
  };
  try {
    const pos: GeolocationPosition = await getPosition();
    const res = await fetch(pos.coords.latitude, pos.coords.longitude);
    location = {
      city: res.items[0].address.city,
      county: res.items[0].address.county,
      country: res.items[0].address.countryName,
      lat: res.items[0].position.lat,
      lon: res.items[0].position.lng,
    };
    return location;
  } catch (err) {
    console.error(err);
  }
};

const getPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    }
  });
};

const fetch = async (lat: number, lon: number) => {
  const result = (
    await axios.get(
      "https://revgeocode.search.hereapi.com/v1/revgeocode?at=" +
        lat +
        "%2C" +
        lon +
        "&lang=en-US&apiKey=AwKuEVPbDNA4IU4wIxcVjWy5baMQ1NsfDl0RAojxZ9o"
    )
  ).data;
  return result;
};

export default getUserLocation;
