import { Diary } from "../types"
import DiaryItem from "./DiaryItem"


const RenderRiaries = ({diaries}: {diaries: Diary[]}) => {

    return (
        <>
        <h3>Diaries: </h3>
        {diaries.map((diary, index) => (
            <DiaryItem key={index} {...diary}/>
        ))}
        </>
    )
}

export default RenderRiaries