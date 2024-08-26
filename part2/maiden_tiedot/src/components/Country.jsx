import Weather from './Weather'

export const Country = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width="150px"
      ></img>
      <p>
        Capital city of {country.name.common} is {country.capital} and the
        population is {country.population} residents.
      </p>

      <label>Languages spoken in {country.name.common}:</label>
      <ul>
        {Object.keys(country.languages).map((item, index) => (
          <li key={index}>{country.languages[item]}</li>
        ))}
      </ul>
      <Weather lat={country.latlng[0]} lon={country.latlng[1]} />
    </>
  )
}
