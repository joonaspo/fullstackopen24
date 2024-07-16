import React, { useEffect, useState } from 'react'

export const SearchForm = ({ searchValue, setCountryNameToSearch}) => {
    
    const handleChange = (event) => {
        setCountryNameToSearch(event.target.value)
    }

    return (
        <>
            <input type='text' placeholder='Search for a country' value={searchValue} onChange={handleChange}></input>
        </>
    )
}