import { SyntheticEvent, useState } from "react"
import diaryService from "../services/diaryService"
import { DiaryEntry, Visibility, Weather } from "../types"
import VisibilityButtons from "./VisibilityButtons"
import WeatherButtons from "./WeatherButtons"
import SelectDate from "./SelectDate"


const EntryForm = () => {

    const [ date, setDate ] = useState('')
    const [ visibility, setVisibility] = useState<Visibility>(Visibility.Great)
    const [ weather, setWeather ] = useState<Weather>(Weather.Sunny)
    const [ comment, setComment ] = useState('')
    const [ error, setError ] = useState<string | null>(null)

    const addEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        const newEntry: DiaryEntry = {
            date,
            visibility,
            weather,
            comment
        }
        console.log(newEntry)
        const response = await diaryService.createNew(newEntry)
        if (response.error) {
            setError(response.error)
            console.log(response.error)
        } else {
            return newEntry
        }
    }

    return (
        <form onSubmit={addEntry}>
            <label>Enter flight details: </label>
            <br/>
            <label>Date: </label>
            <SelectDate setDate={setDate}/>
            <br/>
            <VisibilityButtons setVisibility={setVisibility}/>
            <br/>
            <WeatherButtons setWeather={setWeather}/>
            <br/>
            <label>Comment: </label>
            <input
                value={comment}
                onChange={({ target }) => setComment(target.value)}>
            </input>
            <br/>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <button type="submit">Add</button>
        </form>
    )
}

export default EntryForm