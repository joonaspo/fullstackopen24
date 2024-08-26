import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({ lat, lon }) => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [weather, setWeather] = useState()
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(apiUrl)
      setWeather(data)
      return
    }
    fetchData()
  }, [apiUrl])
  console.log(weather)
  return (
    <>
      {weather && (
        <>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          ></img>
          <p>Wind speed: {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  )
}

export default Weather
