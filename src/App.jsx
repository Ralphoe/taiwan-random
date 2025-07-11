import { BrowserRouter, Routes, Route } from "react-router-dom";
import StationPage from "./pages/StationPage/StationPage";
import StationResult from "./pages/StationResult/StationResult";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StationPage />} />
        <Route path="/result" element={<StationResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
