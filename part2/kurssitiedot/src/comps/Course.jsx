export const Course = (props) => {



    console.log(props)
    
    console.log(props.course)

    const Header = () => {
        return (
            <h1>{props.course.name}</h1>
        )
    }

    const Part = () => {
        return (
            <div>
                {props.course.parts.map((part, i) => (
                    <div key={i}>
                    <p>{part.name}: {part.exercises}</p>
                    </div>
                ))}
            </div>
        )
    }    
    
    const Total = () => {
        
        let exercisesArray = props.course.parts.map((part => part.exercises))
        console.log(exercisesArray)

        let initial = 0

        const sum = exercisesArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initial,
        )

        console.log(sum)

        return (
            <div>
                <strong><p>Total of {sum} exercises</p></strong>
            </div>
        )
    }

    return (
        <>
        <h1>Web Development Curriculum</h1>
        <Header></Header>
        <Part></Part>
        <Total></Total>
        </>
    )


}