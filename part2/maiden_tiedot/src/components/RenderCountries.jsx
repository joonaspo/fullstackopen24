export const RenderCountries = ({ countries, setCountryNameToSearch, setFilteredCountries }) => {


    const handleButton = (event) => {
        setCountryNameToSearch(event.target.value)
    }



    return (
        <>
        {countries.length > 10 ? (
            <p>Too many matches, be more specific</p>
        )
        : 
        (countries.map((country, index) => (
            
            <p key={index}>{country.name.common} <button value={country.name.common} onClick={handleButton}>Show country by autocomplete</button>
            <button onClick={() => setFilteredCountries([countries[index]])}>Show country</button>
            </p>
            ))
        )}
        </>
    )
}