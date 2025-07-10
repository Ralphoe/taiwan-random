import { BrowserRouter, Routes, Route } from "react-router-dom";
import StationPage from "./pages/StationPage/StationPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stations" element={<StationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
