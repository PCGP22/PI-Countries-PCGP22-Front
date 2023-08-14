import { useLocation } from 'react-router-dom';
import { connect } from "react-redux"
import { useEffect } from 'react'
import { nameSearch } from '../redux/actions'
import Container from './Container';

function SearchResults(props) {

  const location = useLocation();

  let countries = props.foundCountries

  useEffect(() => {
    if(location.pathname === "/countries/countries/search"){
      let name = location.search.split("=")[1];
      props.nameSearch(name.toString().trim())
      countries = props.foundCountries
    } 
 
  }, [location])
  
  return (
    <>
      <main className='homePage__container'>
       <Container source={countries}/>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    foundCountries: state.foundCountries,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    nameSearch: (name) => {dispatch(nameSearch(name))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchResults)