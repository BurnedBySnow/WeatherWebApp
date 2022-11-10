import "./App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Weather from "./Weather/Weather";
import { Route, Routes } from "react-router-dom";
import LocationInfo from "./Location/LocationInfo/LocationInfo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/location/:id" element={<LocationInfo />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
