import personServices from '../services/persons'

export const RenderPersons = ( {persons, showAll, searchThis, setPersons, setSuccessMessage, setErrorMessage } ) => {

    const namesToShow = showAll
        ? persons
        : persons.filter(person => person.name && person.name.toLowerCase().includes(searchThis.toLowerCase()))

    const deletePerson = (id, name) => {

        if (window.confirm(`Delete ${name}?`)) {
        personServices
            .deleteThis(id)
            .then(response => {
                setPersons(persons.filter(person => person.id !== id))
                setSuccessMessage(
                    `Successfully removed ${name} from the phonebook!`
                ) 
                setTimeout(() => {
                    setSuccessMessage(null)
                  }, 2000)
            })
    }}

    return (
        <>
            <ul>
            {namesToShow.map((person,index) => 
            <li key={index}>
                {person.name} | {person.number} <button onClick={() => deletePerson(person.id,person.name)}>delete</button>
            </li>
            )}
            </ul>
        </>
    )
}