import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import country from './services/country'
import { CountryInfo } from './components/CountryInfo'

function App() {
  const [countryInfo, setCountryInfo] = useState(null)
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    country.getAll().then(repsonse => {
      setCountries(repsonse.data)
    })
  }, []);

  const handleSearch = (e) => {

    const searchCountry = e.target.value;
    setMessage('');

    if (searchCountry.length < 2) {
      return;
    }

    const filterPattern = new RegExp(searchCountry, 'i');
    const matches = countries.filter(country => country.name.common.match(filterPattern))

    if (matches.length == 1) {
      showCountry(matches[0].name.common);
    } else if (matches.length > 3) {
      setCountryInfo(null)
      setFilteredCountries([]);
      setMessage('Too many matches, please more specific');
    } else if (matches.length > 1) {
      setFilteredCountries(matches);
      setCountryInfo(null)
    } 
  }

  const getCountryInfo = (name) => {
    country.getInfo(name).then(response => {
      setCountryInfo(response.data)
    })
  }

  const showCountry = (name) => {
    getCountryInfo(name);
    setFilteredCountries([]);
  }

  if (countries.length == 0) {
    return <span>Loading ....</span>
  }


  return (
    <>
      <span style={{ marginRight: '5px' }}>
        Find countries
      </span>

      <input type='text' onChange={handleSearch} />

      {message && <span style={{color: 'red'}}>{message}</span>}

      <div>
        {filteredCountries.length > 0 && filteredCountries.map(country => {
          return (<div>
            <span>{country.name.common}</span>
            <button onClick={() => { showCountry(country.name.common) }}>Show</button>
          </div>)
        })}
        {countryInfo && <CountryInfo name={countryInfo.name.common} capital={countryInfo.capital[0]} flagImageUrl={countryInfo.flags.png} area={countryInfo.area} languages={countryInfo.languages} />}
      </div>
    </>
  )
}

export default App
