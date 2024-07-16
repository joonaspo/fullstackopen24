import { CoursePart} from "../types"

const Part = (course: CoursePart) => {
    switch (course.kind) {
        case 'basic':
            return <>
                    <h4>{course.name}</h4>
                    <p>Exercises: {course.exerciseCount}</p>
                    <p>"{course.description}"</p>
                   </>
        case 'group':
            return <>
                    <h4>{course.name}</h4>
                    <p>Exercises: {course.exerciseCount}</p>
                    <p>Group projects: {course.groupProjectCount}</p>
                   </>
        case 'background':
            return <>
                    <h4>{course.name}</h4>
                    <p>Exercises: {course.exerciseCount}</p>
                    <p>"{course.description}"</p>
                    <a href={course.backgroundMaterial}>{course.backgroundMaterial}</a>
                   </> 
        case 'special':
            return <>
                    <h4>{course.name}</h4>
                    <p>Exercises: {course.exerciseCount}</p>
                    <p>"{course.description}"</p>
                    <p>Requirements:  
                    {course.requirements.map((e) => 
                    <span key={e}> {e} </span>
                    )}
                    </p>
                    </>       
        default:
            break;
    }
}

export default Part