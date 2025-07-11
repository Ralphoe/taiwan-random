import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './StationPage.scss'

const StationPage = () => {
  const [stations, setStations] = useState([])
  const [filteredStations, setFilteredStations] = useState([])
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [isEditingCity, setIsEditingCity] = useState(false)
  const [cityName, setCityName] = useState('臺北')

  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    fetch('../../../public/stations.json')
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
    <motion.div
      className="taiwan-station"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="station-title" variants={itemVariants}>
        電車
        <span className="emphasized-word">
          口<span className="huge-title">乞</span>
        </span>
        漢
      </motion.h1>

      <motion.h3 className="filter-title" variants={itemVariants}>
        選擇地區:
      </motion.h3>
      <motion.div className="filter-group" variants={itemVariants}>
        {['北部', '中部', '南部', '東部'].map((r) => (
          <motion.div
            key={r}
            className={`filter-option ${
              selectedRegions.includes(r) ? 'active' : ''
            }`}
            onClick={() => {
              setSelectedRegions((prev) =>
                prev.includes(r) ? prev.filter((v) => v !== r) : [...prev, r]
              )
            }}
            variants={itemVariants}
          >
            {r}
          </motion.div>
        ))}
      </motion.div>

      <motion.h3 className="filter-title" variants={itemVariants}>
        選擇站等:
      </motion.h3>
      <motion.div className="filter-group" variants={itemVariants}>
        {['特等', '一等', '二等', '其他'].map((l) => (
          <motion.div
            key={l}
            className={`filter-option ${
              selectedLevels.includes(l) ? 'active' : ''
            }`}
            onClick={() => {
              setSelectedLevels((prev) =>
                prev.includes(l) ? prev.filter((v) => v !== l) : [...prev, l]
              )
            }}
            variants={itemVariants}
          >
            {l}
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="btn--random"
        onClick={handlePickRandomStation}
        variants={itemVariants}
      >
        GO!
      </motion.button>
    </motion.div>
  )
}

export default StationPage
