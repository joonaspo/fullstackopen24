import { useState, useEffect } from 'react'
import { RenderPersons } from './components/RenderPersons'
import { FilterPersons } from './components/FilterPersons'
import { PersonForm } from './components/PersonForm'
import { Notification } from './components/Notification'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll ] = useState(false)
  const [searchThis, setSearchThis] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
      personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setSuccessMessage(
          `Successfully fetched data from the server`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)
      })
      .catch(error => {
        setErrorMessage(
          `Failed to fetch data from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }, [])



  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchThis(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
      errorMessage={errorMessage}
      successMessage={successMessage}
      />
      <PersonForm 
      persons={persons} 
      setPersons={setPersons} 
      setNewName={setNewName} 
      setNewNumber={setNewNumber} 
      newName={newName} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange} 
      handlePersonChange={handlePersonChange}
      setErrorMessage={setErrorMessage}
      setSuccessMessage={setSuccessMessage}
      />
      <br/>
      <FilterPersons searchThis={searchThis} 
      handleSearch={handleSearch}
      />
      <h2>Numbers</h2>
      <RenderPersons 
      persons={persons} 
      setPersons={setPersons}
      showAll={showAll} 
      searchThis={searchThis}
      setErrorMessage={setErrorMessage}
      setSuccessMessage={setSuccessMessage}
      />
    </div>
  )


}

export default App