declare var require: any;
import axios from "axios";
axios.defaults.adapter = require('axios/lib/adapters/http');

export function getBackpackFromAPI(steamid, appid) {
    let url = `http://steamcommunity.com/inventory/${steamid}/${appid}/2?l=english&count=5000`;
    return axios.get(url).then(({ data }) => data);
}