import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import "./LocationInfo.scss";

const LocationInfo = () => {
  const locations = useSelector((state: RootState) => state.locations);
  const weather = useSelector((state: RootState) => state.weather);
  const { id } = useParams();

  return (
    <div className="locationInfo">
      <div className="main-page"></div>
    </div>
  );
};

export default LocationInfo;
