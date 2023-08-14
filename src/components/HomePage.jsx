import { connect } from "react-redux"
import { useState } from 'react'
import Filter from './Filter.jsx'
import Container from './Container';
import "../styles/HomePage.modules.css"


function HomePage(props) {

  const [reloadAux, setReloadAux] = useState(true)

  let countries = props.countriesFiltered

  const aux = () => {
    setReloadAux(!reloadAux)
    countries = props.countriesFiltered
  }

  
  return (
    <>
      <Filter aux={aux}/>
      <main className='homePage__container'>
        <Container source={countries} aux={aux}/>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    countriesFiltered: state.countriesFiltered
  }
}


export default connect(mapStateToProps,null)(HomePage)