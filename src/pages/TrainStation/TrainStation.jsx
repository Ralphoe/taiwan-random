import { useEffect, useState } from 'react';
import { getTRAStations } from '../../api/ptx';

function TrainStation() {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTRAStations();
            setStations(data);
        };

        fetchData();
    },[]);

    return (
        <div className="taiwan-train">
            <h1>台灣火車站列表</h1>
            <ul>
                {stations.map((station) => (
                    <li key={station.StationID}>
                        {station.StationName.Zh_tw} ({station.StationID.En})
                        <span>{station.StationAddress}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TrainStation;