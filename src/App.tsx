import "./App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Weather from "./Weather/Weather";
import { Route, Routes } from "react-router-dom";
import LocationInfo from "./Location/LocationInfo/LocationInfo";
import LocationList from "./Locations/LocationList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/location/:id" element={<LocationInfo />} />
        <Route path="/location/search/:id" element={<LocationList />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
