import Header from './components/Header'
import RenderRiaries from './components/RenderDiaries'
import { Diary } from './types'
import { useState, useEffect } from 'react'
import diaryService from './services/diaryService'
import EntryForm from './components/EntryFrom'

function App() {
  const [ diaries, setDiaries ] = useState<Diary[]>([])

  useEffect(() => {
    const fetchData = async () => {
        const response = await diaryService.getAll()
        console.log(response)
        setDiaries(response)
    } 
    fetchData()
}, [])

  return (
    <>
      <Header/>
      <EntryForm />
      <RenderRiaries diaries={diaries}/>
    </>
  )
}

export default App