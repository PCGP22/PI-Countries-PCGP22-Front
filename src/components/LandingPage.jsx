import { Link} from 'react-router-dom'
import { connect } from "react-redux"
import { useEffect } from 'react'
import { addCountries, addActivities, nameSearch } from '../redux/actions'
import image from "../countries.png"
import "../styles/LandingPage.modules.css"

function LandingPage(props) {

  useEffect(() => {
    props.addCountries()
    props.addActivities()
  }, [])
  
  return (
    <>
      <div className='landingPage__container'>
        <main className={'landingPage__main dark-purple white-text'}>
            <h1 className='landingPage__title title-text no-space'>Countries</h1>
            <p className='landingPage__text big-text no-space'>Application where you can create touristic activities for any country while learning some info about them.</p>
            <Link to="/countries/countries/" className='landingPage__button button big-text'>
                Begin
            </Link>
        </main>
        <aside className='landingPage__aside'>
            <img className='landingPage__image' src={image}/>
        </aside>
      </div>     
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return{
    addCountries: ()=>{dispatch(addCountries())},
    addActivities: ()=>{dispatch(addActivities())},
    nameSearch: (name) => {dispatch(nameSearch(name))}
  
  }
}

export default connect(null,mapDispatchToProps)(LandingPage)