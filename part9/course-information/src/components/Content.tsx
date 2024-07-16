import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({courses}: {courses: CoursePart[]} ) => {
    console.log(courses)
    return (
        <>
        {courses.map((course, i) => (
            <Part key={i} {...course}/>
        ))}
        </>
    )
}

export default Content