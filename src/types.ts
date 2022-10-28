import { filter } from "./assets/weathericons";

const a = filter();
type WeatherType = keyof typeof a;

export interface WeatherData {
  summary?: WeatherType;
  date: Date;
  temp: number;
  windSpeed: number;
  humidity: number;
  rainAmount?: number;
}

export interface ApiWeather {
  time: string;
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number;
        air_temperature: number;
        cloud_area_fraction: number;
        relative_humidity: number;
        wind_from_direction: number;
        wind_speed: number;
      };
    };
    next_1_hours?: {
      details: {
        precipitation_amount: number;
      };
      summary: {
        symbol_code: string;
      };
    };
  };
}

export interface Location {
  id: string;
  name: string;
  category: string;
  type: string;
  latitude: number;
  longitude: number;
}

export interface ApiLocation {
  features: {
    geometry: {
      coordinates: string[];
    };
    properties: {
      display_name: string;
      category: string;
      type: string;
    };
  }[];
}

export interface UserLocation {
  status: string;
  continent: string;
  country: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
}
