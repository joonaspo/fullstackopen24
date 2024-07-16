import { Weather } from "../types"

interface Props {
    setWeather: (weather: Weather) => void
}

const WeatherButtons: React.FC<Props> = ({setWeather}) => {
    return (
        <>
        <label>Weather: </label>
        <input
            type="radio"
            id="sunny"
            value={Weather.Sunny} 
            onChange={({ target }) => setWeather(target.value as Weather)}
            name="weather"
            >
        </input>
        <label>Sunny</label>
        <input
            type="radio"
            id="cloudy"
            value={Weather.Cloudy} 
            name="weather"
            onChange={({ target }) => setWeather(target.value as Weather)}>
        </input>
        <label>Cloudy</label>
        <input
            type="radio"
            id="windy"
            value={Weather.Windy}
            name="weather" 
            onChange={({ target }) => setWeather(target.value as Weather)}>
        </input>
        <label>Windy</label>
        <input
            type="radio"
            id="rainy"
            value={Weather.Rainy}
            name="weather" 
            onChange={({ target }) => setWeather(target.value as Weather)}>
        </input>
        <label>Rainy</label>
        <input
            type="radio"
            id="stormy"
            value={Weather.Stormy}
            name="weather" 
            onChange={({ target }) => setWeather(target.value as Weather)}>
        </input>
        <label>Stormy</label>
        </>
    )
}

export default WeatherButtons