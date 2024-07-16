export const FilterPersons = ( {searchThis,handleSearch} ) => {
      

    console.log(searchThis)
    return(
        <>
            <form>
            Search for entries: <input value={searchThis} onChange={handleSearch}/>
            </form>
        </>
    )
}