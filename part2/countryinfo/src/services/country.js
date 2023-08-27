import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries';

const getInfo = (name) => {
    return axios.get(`${baseUrl}/api/name/${name}`)
}

const getAll = () => {
    return axios.get(`${baseUrl}/api/all`)
}

export default {
    getInfo,
    getAll
}