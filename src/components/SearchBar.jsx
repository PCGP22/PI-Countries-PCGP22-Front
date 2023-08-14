import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { ImSearch } from "react-icons/im";
import "../styles/SearchBar.modules.css"

function SearchBar() {

  const [name, setName] = useState("")
  const navigate = useNavigate();

  const handleClick = async() => {
     setName("")
  }
  
  const handleKeyDown = async(e) => {
    if(e.keyCode === 13) { //Detect enter
      navigate(`/countries/countries/search?name=${name}`)
      setName("")
    }
  }
  
  return (
    <div className='searchBar__container normal-text'>
        <input type='text' placeholder='Search country' onChange={(e)=>setName(e.target.value)} onKeyDown={handleKeyDown} className='searchBar__input' value={name}/>
        <Link to={`/countries/countries/search?name=${name}`} className='searchBar__button' onClick={handleClick}>
          <ImSearch/>
        </Link>
    </div>
  )
}

export default SearchBar
