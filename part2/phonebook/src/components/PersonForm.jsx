import personServices from '../services/persons'

export const PersonForm = ( {persons, setPersons, newName, setNewName, newNumber , setNewNumber,handleNumberChange, handlePersonChange, setSuccessMessage, setErrorMessage} ) => {
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = 
          { name: newName, number: newNumber }
        
        console.log(personObject)
    
        const existingPerson = persons.find((person) => person.name === newName)

        if (existingPerson) {
           if (window.confirm(`${newName} is already added to phonebook. Do you want to update their number?`)) {

            personServices
              .update(existingPerson.id, personObject)
              .then(response => {
                setPersons(persons.map(person => person.id === existingPerson.id
                  ? { ...person, number: response.data.number } 
                  : person 
                  ))

                setNewName('')
                setNewNumber('')
              })
              .catch(error => {
                console.log('fail')
                setErrorMessage(
                  `Information of ${newName} has already been removed from the server!`
                )
              })

          }
        } else

        personServices
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(
                `Added ${newName} to phonebook!`
              )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 2000)
          })

      }

      
    return (
        <form onSubmit={addPerson}>
        <div>
          <h3>Add a new entry</h3>
          Name: <input required placeholder="A new person.."value={newName} onChange={handlePersonChange}/><br/><br/>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
        <br/>
          <button type="submit">add</button>
        </div>
      </form>
    )
}