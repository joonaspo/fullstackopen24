export const RenderCountries = ({ countries, setFilteredCountries }) => {
  return (
    <>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countries.map((country, index) => (
          <p key={index}>
            {country.name.common}
            <button onClick={() => setFilteredCountries([countries[index]])}>
              Show
            </button>
          </p>
        ))
      )}
    </>
  )
}
