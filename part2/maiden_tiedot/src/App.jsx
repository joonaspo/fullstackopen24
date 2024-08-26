import { useState, useEffect } from 'react'
import axios from 'axios'
import { SearchForm } from './components/SearchForm'
import { RenderCountries } from './components/RenderCountries'
import { Country } from './components/Country'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([...countries])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredCountries(filteredCountries)
  }, [countries, searchValue])

  return (
    <>
      <SearchForm
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      ></SearchForm>
      {filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]}></Country>
      ) : (
        <RenderCountries
          countries={filteredCountries}
          setSearchValue={setSearchValue}
          setFilteredCountries={setFilteredCountries}
        ></RenderCountries>
      )}
    </>
  )
}

export default App

