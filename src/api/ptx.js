import axios from "axios";

export const getTRAStations = async () => {
  const url =
    "https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$format=JSON";

  try {
    const reponse = await axios.get(url);
    return reponse.data;
  } catch (error) {
    console.warn("取得車站資料失敗:", error);
    return [];
  }
};
