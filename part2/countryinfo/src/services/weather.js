import axios from 'axios'
const api_key = '4b7d3b20170c4c75821712e6e08700e5'
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`;

const getWeather = (city) => {
    return axios.get(`${baseUrl}&q=${city}`);
}

export default {
    getWeather
}