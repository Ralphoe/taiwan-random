import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FixedBarcode from "../../component/FixedBarcode/FixedBarcode";
import "./StationResult.scss";

const StationResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const station = state?.station;
  const cityName = state?.cityName || "台北";

  const date = new Date();
  const formattedDate = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  const time = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

  const [isEditingCity, setIsEditingCity] = useState(false);
  const [editableCityName, setEditableCityName] = useState(cityName);

  const [revealed, setRevealed] = useState(false);
  const [rollingName, setRollingName] = useState("");

  const getRandomText = () => {
    const pool = "台中高雄新竹台北花蓮嘉義台南彰化苗栗雲林南港七堵樹林左營";
    const char1 = pool[Math.floor(Math.random() * pool.length)];
    const char2 = pool[Math.floor(Math.random() * pool.length)];
    return char1 + char2;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRollingName(getRandomText());
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setRevealed(true);
    }, 3000); // 3秒後揭曉真實車站名稱

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="result">
      <button onClick={() => navigate(-1)} className="btn--back">BACK</button>

      <div className="train-ticket">
        <p className="top-mark default-word">臺灣鐵路局</p>
        <span className="ticket-bg">
          <img src="/images/train/ticket.png" alt="" />
        </span>
        <div className="train-info">
          <div className="train-info__left">
            <div className="date">{formattedDate}</div>
            <div className="category">全票</div>
          </div>
          <div className="train-info__right">
            <div className="train-num">1069次</div>
            <div className="train-category">新自強</div>
          </div>
        </div>
        {isEditingCity ? (
          <input
            type="text"
            className="departure-city"
            value={editableCityName}
            autoFocus
            maxLength={5}
            onChange={(e) => setEditableCityName(e.target.value)}
            onBlur={(e) => {
              const value = e.target.value.trim();
              if (value === "") {
                setEditableCityName("臺北");
              } else {
                setEditableCityName(value);
              }
              setIsEditingCity(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditingCity(false);
                if (editableCityName.trim() === "") {
                  setEditableCityName("臺北");
                }
              }
            }}
          />
        ) : (
          <h2 className="departure-city" onClick={() => setIsEditingCity(true)}>
            {editableCityName}
          </h2>
        )}
        <span className="mark-heading">▼</span>
        <h2 className="arrival-city">
          {revealed ? station.Name : rollingName}
        </h2>
        <p className="cost default-word">NT＄1,069</p>
        <p className="default-word">限當日當次車有效</p>
        <p className="default-word">{`定刷{1069}會換{*1069}異`}</p>
        <p className="default-word code">M10691069106966</p>
        <p className="default-word">1069-1069-1069 {time}</p>
        <p className="default-word barcode">
          <FixedBarcode value="A1B2C3D4E5F6" />
        </p>
      </div>

      {revealed && (
        <motion.iframe
          className="google-map"
          title="Google Map"
          src={`https://maps.google.com/maps?q=${station.Lat},${station.Lon}&z=16&output=embed`}
          allowFullScreen
          frameBorder="0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </div>
  );
};

export default StationResult;
