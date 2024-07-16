import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  console.log(total)

  const countAverage = ((props.good*1)+(props.bad*-1))/total

  const countPositive = props.good/total*100

  const StatisticLine = (props) => {
    return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
    )
  }

  if (total === 0) {
    return (
      <div>
      <h3>No feedback given!</h3>
      </div>
    );
  } 

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good reviews: "value={props.good}/>
          <StatisticLine text="Neutral reviews: "value={props.neutral}/>
          <StatisticLine text="Bad reviews: "value={props.bad}/>
          <StatisticLine text="Total amount of reviews: " value={total}/>
          <StatisticLine text="Average of reviews: " value={countAverage}/> 
          <StatisticLine text="Positive reviews (%): " value={countPositive}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValueGood = (newGoodValue) => {
    console.log("Value 'Good' now:",newGoodValue)
    setGood(newGoodValue)
  }

  const setToValueNeutral = (newNeutralValue) => {
    console.log("Value 'Neutral' now:",newNeutralValue)
    setNeutral(newNeutralValue)
  }

  const setToValueBad = (newBadValue) => {
    console.log("Value 'Bad' now:",newBadValue)
    setBad(newBadValue)
  }



  return (
    <div>
      <h1>Give feedback!</h1>
        <Button handleClick={() => setToValueGood(good + 1)} text="Good" />
        <Button handleClick={() => setToValueNeutral(neutral + 1)} text="Neutral"/>
        <Button handleClick={() => setToValueBad(bad + 1)} text="Bad"/>
      <div>
        <h2>Results</h2>
          <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App