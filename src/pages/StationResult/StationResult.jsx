import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FixedBarcode from '../../component/FixedBarcode/FixedBarcode'
import './StationResult.scss'

const StationResult = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const station = state?.station
  const cityName = state?.cityName || '台北'

  const date = new Date()
  const formattedDate = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
  const time = `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`

  const [isEditingCity, setIsEditingCity] = useState(false)
  const [editableCityName, setEditableCityName] = useState(cityName)

  const [revealed, setRevealed] = useState(false)
  const [rollingName, setRollingName] = useState('')

  const [mapLoaded, setMapLoaded] = useState(false)

  const getRandomText = () => {
    const pool = '台中高雄新竹台北花蓮嘉義台南彰化苗栗雲林南港七堵樹林左營'
    const char1 = pool[Math.floor(Math.random() * pool.length)]
    const char2 = pool[Math.floor(Math.random() * pool.length)]
    return char1 + char2
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  }

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setRollingName(getRandomText())
    }, 50)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setRevealed(true)
    }, 3000) // 3秒後揭曉真實車站名稱

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    const img = new Image()
    img.src = './images/train/ticket.png'

    const fontReady = document.fonts?.ready || Promise.resolve()

    img.onload = () => {
      fontReady.then(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 300)
      })
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-spinner" />
          <div
            style={{
              fontFamily: 'NotoSerifTC',
              opacity: 0,
              position: 'absolute',
            }}
          >
            字體載入測試
          </div>
        </div>
      ) : (
        <motion.div
          className="result"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="train-ticket" variants={itemVariants}>
            <motion.p className="top-mark default-word" variants={itemVariants}>
              臺灣鐵路局
            </motion.p>
            <motion.span className="ticket-bg" variants={itemVariants}>
              <img src="./images/train/ticket.png" alt="ticket image" />
            </motion.span>

            <motion.div className="train-info" variants={itemVariants}>
              <motion.div className="train-info__left" variants={itemVariants}>
                <div className="date">{formattedDate}</div>
                <div className="category">全票</div>
              </motion.div>
              <motion.div className="train-info__right" variants={itemVariants}>
                <div className="train-num">1069次</div>
                <div className="train-category">新自強</div>
              </motion.div>
            </motion.div>

            {isEditingCity ? (
              <motion.input
                type="text"
                className="departure-city"
                value={editableCityName}
                autoFocus
                maxLength={5}
                onChange={(e) => setEditableCityName(e.target.value)}
                onBlur={(e) => {
                  const value = e.target.value.trim()
                  if (value === '') {
                    setEditableCityName('臺北')
                  } else {
                    setEditableCityName(value)
                  }
                  setIsEditingCity(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditingCity(false)
                    if (editableCityName.trim() === '') {
                      setEditableCityName('臺北')
                    }
                  }
                }}
                variants={itemVariants}
              />
            ) : (
              <motion.h2
                className="departure-city"
                onClick={() => setIsEditingCity(true)}
                variants={itemVariants}
              >
                {editableCityName}
              </motion.h2>
            )}

            <motion.span className="mark-heading" variants={itemVariants}>
              ▼
            </motion.span>
            <motion.h2 className="arrival-city" variants={itemVariants}>
              {revealed ? station.Name : rollingName}
            </motion.h2>
            <motion.p className="cost default-word" variants={itemVariants}>
              NT＄1,069
            </motion.p>
            <motion.p className="default-word" variants={itemVariants}>
              限當日當次車有效
            </motion.p>
            <motion.p className="default-word" variants={itemVariants}>
              {`定刷{1069}會換{*1069}異`}
            </motion.p>
            <motion.p className="default-word code" variants={itemVariants}>
              M10691069106966
            </motion.p>
            <motion.p className="default-word" variants={itemVariants}>
              1069-1069-1069 {time}
            </motion.p>
            <motion.p className="default-word barcode" variants={itemVariants}>
              <FixedBarcode value="A1B2C3D4E5F6" />
            </motion.p>
          </motion.div>

          {revealed && (
            <div className="map-container">
              {!mapLoaded && <div className="map-skeleton" />}
              <motion.iframe
                className="google-map"
                title="Google Map"
                src={`https://maps.google.com/maps?q=${station.Lat},${station.Lon}&z=16&output=embed`}
                allowFullScreen
                frameBorder="0"
                loading="lazy"
                onLoad={() => setMapLoaded(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={mapLoaded ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ position: mapLoaded ? 'relative' : 'absolute' }}
              />
            </div>
          )}

          <motion.button
            onClick={() => navigate(-1)}
            className="btn--back"
            variants={itemVariants}
          >
            BACK
          </motion.button>
        </motion.div>
      )}
    </>
  )
}

export default StationResult
