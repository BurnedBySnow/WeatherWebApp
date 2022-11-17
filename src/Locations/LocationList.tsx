import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import debounce, { DebounceOptions } from "debounce-promise";
import Navbar from "../Weather/Navbar/Navbar";
import { useEffect, useState } from "react";
import getLocations from "../api/getLocations";
import { nanoid } from "nanoid";
import { setSearchData } from "../reducers/searchSlice";
import { Location, ApiWeather, WeatherData, WeatherType } from "../types";
import "./LocationList.scss";
import List from "./List/List";
import { useParams } from "react-router-dom";

const LocationList = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { id } = useParams();

  const searchData = useSelector((state: RootState) => state.searchData);
  const dispatch = useDispatch();

  const wait = 250; // milliseconds
  const loadOptions = (inputValue: string) => getAsyncOptions(inputValue);
  const debouncedLoadOptions = debounce(loadOptions, wait, {
    leading: false,
  });

  const getAsyncOptions = async (inputValue: string) => {
    setShowDropdown(true);
    const locationData = await getLocations(inputValue);
    const arr: Location[] = locationData.features.map((item) => {
      return {
        id: nanoid(),
        name: item.properties.display_name,
        category: item.properties.category,
        type: item.properties.type,
        latitude: +item.geometry.coordinates[1],
        longitude: +item.geometry.coordinates[0],
      };
    });
    dispatch(setSearchData(arr));
  };

  const changeSearch = (value: string) => {
    debouncedLoadOptions(value);
  };

  useEffect(() => {
    const locationsStorage: Location[] = JSON.parse(
      localStorage.getItem("searchData") || "{}"
    );
    if (locationsStorage.length > 0) {
      dispatch(setSearchData(locationsStorage));
    }
  }, []);

  useEffect(() => {
    if (searchData?.length)
      localStorage.setItem("searchData", JSON.stringify(searchData));
  }, [searchData]);

  return (
    <div className="location-list">
      <Navbar
        changeSearch={changeSearch}
        setShowDropdown={(b: boolean) => setShowDropdown(b)}
        showDropdown={showDropdown}
      />
      <div className="list-container">
        <div className="location-name">{id}</div>
        <List />
      </div>
    </div>
  );
};

export default LocationList;
