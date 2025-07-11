import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './StationPage.scss'

const StationPage = () => {
  const [stations, setStations] = useState([])
  const [filteredStations, setFilteredStations] = useState([])
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [isEditingCity, setIsEditingCity] = useState(false)
  const [cityName, setCityName] = useState('臺北')

  const navigate = useNavigate()

  useEffect(() => {
    fetch('/stations.json')
      .then((res) => res.json())
      .then((data) => {
        setStations(data)
        setFilteredStations(data)
      })
  }, [])

  useEffect(() => {
    if (stations.length === 0) return

    const result = stations.filter((station) => {
      const regionMatch =
        selectedRegions.length === 0 || selectedRegions.includes(station.Region)
      const levelMatch =
        selectedLevels.length === 0 || selectedLevels.includes(station.Level)
      return regionMatch && levelMatch
    })

    setFilteredStations(result)
  }, [selectedRegions, selectedLevels, stations])

  const handlePickRandomStation = () => {
    if (filteredStations.length === 0) return
    const random = Math.floor(Math.random() * filteredStations.length)
    const picked = filteredStations[random]
    navigate('/result', { state: { station: picked, cityName } })
  }

  return (
    <div className="taiwan-station">
      <h1 className="station-title">
        電車
        <span className="emphasized-word">
          口<span className="huge-title">乞</span>
        </span>
        漢
      </h1>
      <h3 className="filter-title">選擇地區:</h3>
      <div className="filter-group">
        {['北部', '中部', '南部', '東部'].map((r) => (
          <div
            key={r}
            className={`filter-option ${
              selectedRegions.includes(r) ? 'active' : ''
            }`}
            onClick={() => {
              setSelectedRegions((prev) =>
                prev.includes(r) ? prev.filter((v) => v !== r) : [...prev, r]
              )
            }}
          >
            {r}
          </div>
        ))}
      </div>

      <h3 className="filter-title">選擇站等:</h3>
      <div className="filter-group">
        {['特等', '一等', '二等', '其他'].map((l) => (
          <div
            key={l}
            className={`filter-option ${
              selectedLevels.includes(l) ? 'active' : ''
            }`}
            onClick={() => {
              setSelectedLevels((prev) =>
                prev.includes(l) ? prev.filter((v) => v !== l) : [...prev, l]
              )
            }}
          >
            {l}
          </div>
        ))}
      </div>

      {/* <h3>出發地:</h3>
      {isEditingCity ? (
        <input
          type="text"
          className="departure-city"
          value={cityName}
          autoFocus
          onChange={(e) => setCityName(e.target.value)}
          onBlur={() => setIsEditingCity(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsEditingCity(false);
          }}
        />
      ) : (
        <h2 className="departure-city" onClick={() => setIsEditingCity(true)}>
          {cityName}
        </h2>
      )} */}

      <button className="btn--random" onClick={handlePickRandomStation}>
        GO!
      </button>
    </div>
  )
}

export default StationPage
