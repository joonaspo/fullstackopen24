import { useState, useEffect } from 'react'
import axios from 'axios'
import { SearchForm } from './components/SearchForm'
import { RenderCountries } from './components/RenderCountries'
import { Country } from './components/Country'

function App() {

  const [searchValue, setCountryNameToSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([...countries])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().includes(searchValue.toLowerCase()))
      setFilteredCountries(filteredCountries)
  }, [searchValue, countries])

  console.log(filteredCountries)

  return (
    <>
      <SearchForm
        searchValue={searchValue}
        setCountryNameToSearch={setCountryNameToSearch}        
      ></SearchForm>
      {filteredCountries.length === 1 ? 
      <Country country={filteredCountries[0]}></Country> 
      : 
      <RenderCountries countries={filteredCountries} setCountryNameToSearch={setCountryNameToSearch} setFilteredCountries={setFilteredCountries}></RenderCountries>}
    </>
  )
}

export default App
