import { Diary } from "../types"

const DiaryItem = (diary: Diary) => {
    return (
        <>
        <h4>Date: {diary.date}</h4>
        <p>Weather: {diary.weather}</p>
        <p>Visibility: {diary.visibility}</p>
        <p>"{diary.comment}"</p>
        </>
    )
}

export default DiaryItem