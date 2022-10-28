import "./App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Weather from "./Weather/Weather";
import { Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Weather />} />
      <Route path="/location" />
    </Routes>
  );
}

export default App;
