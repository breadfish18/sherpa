import axios from "axios";

export function getBackpackFromAPI(
    steamid,
    appid,
    axiosInstance = axios.create()
) {
    let url = `http://steamcommunity.com/inventory/${steamid}/${appid}/2?l=english&count=5000`;
    return axiosInstance.get(url).then(({ data }) => data);
}
