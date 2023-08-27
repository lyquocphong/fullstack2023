import { useEffect, useState } from "react"
import weatherService from '../services/weather'


export const OpenWeather = ({city}) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        weatherService.getWeather(city).then(response => {
            setData(response.data)
        })
    }, [])

    if (!data) {
        return null; 
    }


    return (
        <div className="weather-container">            
            <div className="country-info-row">
                <span>temperature {data.main.temp} </span>
            </div>

            <div className="weather-info-row">
                <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
            </div>

            <div className="weather-info-row">
                <span>wind {data.wind.speed} m/s</span>
            </div>
        </div>
    )
}