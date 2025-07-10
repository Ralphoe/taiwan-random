import { useEffect, useState } from "react";
import "./StationPage.scss";

const StationPage = () => {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  useEffect(() => {
    fetch("/stations.json")
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        setFilteredStations(data);
      });
  }, []);

  useEffect(() => {
    if (stations.length === 0) return;

    const result = stations.filter((station) => {
      const regionMatch =
        selectedRegions.length === 0 ||
        selectedRegions.includes(station.Region);
      const levelMatch =
        selectedLevels.length === 0 || selectedLevels.includes(station.Level);
      return regionMatch && levelMatch;
    });

    setFilteredStations(result);
    setSelectedStation(null);
  }, [selectedRegions, selectedLevels, stations]);

  //   隨機抽選
  const handlePickRandomStation = () => {
    if (filteredStations.length === 0) return;
    const random = Math.floor(Math.random() * filteredStations.length);
    setSelectedStation(filteredStations[random]);
  };

  return (
    <div className="taiwan-station">
      <h1>電車吃漢</h1>

      {/* <h3>選擇地區:</h3>
      {["北部", "中部", "南部", "東部", "其他"].map((r) => (
        <label key={r}>
          <input
            type="checkbox"
            value={r}
            checked={selectedRegions.includes(r)}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedRegions((prev) =>
                prev.includes(value)
                  ? prev.filter((v) => v !== value)
                  : [...prev, value]
              );
            }}
          />
          {r}
        </label>
      ))}

      <h3>選擇站等:</h3>
      {["特等站", "一等站", "二等站", "其他"].map((l) => (
        <label key={l}>
          <input
            type="checkbox"
            value={l}
            checked={selectedLevels.includes(l)}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedLevels((prev) =>
                prev.includes(value)
                  ? prev.filter((v) => v !== value)
                  : [...prev, value]
              );
            }}
          />
          {l}
        </label>
      ))} */}

      <h3>選擇地區:</h3>
      <div className="filter-group">
        {["北部", "中部", "南部", "東部", "其他"].map((r) => (
          <div
            key={r}
            className={`filter-option ${
              selectedRegions.includes(r) ? "active" : ""
            }`}
            onClick={() => {
              setSelectedRegions((prev) =>
                prev.includes(r) ? prev.filter((v) => v !== r) : [...prev, r]
              );
            }}
          >
            {r}
          </div>
        ))}
      </div>

      <h3>選擇站等:</h3>
      <div className="filter-group">
        {["特等站", "一等站", "二等站", "其他"].map((l) => (
          <div
            key={l}
            className={`filter-option ${
              selectedLevels.includes(l) ? "active" : ""
            }`}
            onClick={() => {
              setSelectedLevels((prev) =>
                prev.includes(l) ? prev.filter((v) => v !== l) : [...prev, l]
              );
            }}
          >
            {l}
          </div>
        ))}
      </div>

      <button className="btn--random" onClick={handlePickRandomStation}>
        出發!
      </button>

      {selectedStation && (
        <div className="result">
          <h2>{selectedStation.Name}</h2>
          <p>📍 {selectedStation.Address}</p>
          <p>📞 {selectedStation.Phone}</p>
          <p>🗺️ {selectedStation.Region}</p>

          <iframe
            className="google-map"
            title="Google Map"
            src={`https://maps.google.com/maps?q=${selectedStation.Lat},${selectedStation.Lon}&z=16&output=embed`}
            allowFullScreen
            frameborder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default StationPage;
