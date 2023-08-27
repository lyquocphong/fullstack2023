import { useEffect, useState } from "react"
import weatherService from '../services/weather'
import { OpenWeather } from "./OpenWeather"


export const CountryInfo = ({name, flagImageUrl, capital, area, languages}) => {

    return (
        <div className="country-info-container">
            <p>{name}</p>
            <div className="country-info-row">
                <span>Capital: {capital}</span>
            </div>

            <div className="country-info-row">
                <span>Area: {area}</span>
            </div>

            <div className="country-info-row">
                <p>Languages: </p>
                <ul>
                    {Object.values(languages).map(lang => <li>{lang}</li>)}
                </ul>
            </div>

            <div className="country-info-row">
                <img src={flagImageUrl}/>
            </div>

            <OpenWeather city={capital} />
        </div>
    )
}