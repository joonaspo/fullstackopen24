import React, { useEffect, useState } from 'react'

export const SearchForm = ({ searchValue, setSearchValue }) => {
  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search for a country"
        value={searchValue}
        onChange={handleChange}
      ></input>
    </>
  )
}
