const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
  }

  const Part = (props) => {
    return (
        <div>
          <a>
            {props.name}: {props.exerciseCount}
          </a>
        </div>
    )
  }

  const Content = (props) => {
    return (
    <div>
      <Part name={props.parts[0].name} exerciseCount={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exerciseCount={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exerciseCount={props.parts[2].exercises}/>
    </div>
      )
  }

  const Total = (props) => {

    let sum = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    console.log(sum)

    return (
        <p>Total amount of parts: {sum}</p>
    )
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <br/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App