import {Routes, Route, useNavigate } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import WithNavBar from "./components/WithNavBar"
import Detail from "./components/Detail.jsx"
import ActivityPage from "./components/ActivityPage"
import HomePage from "./components/HomePage.jsx"
import SearchResults from "./components/SearchResults"
import ActivityDetail from "./components/ActivityDetail"
import { useEffect } from "react"
import "./styles/App.modules.css"

function App() {

  const navigate = useNavigate()
  
  useEffect(() => {
    navigate("/countries/")
  }, [])
  


  return (
    <Routes>
      <Route path="/countries/" element={<LandingPage navBar={false}/>}/>
      <Route element={<WithNavBar/>}>
        <Route path="/countries/countries/" element={<HomePage/>}/>
        <Route path="/countries/countries/search" element={<SearchResults/>}/>
        <Route path="/countries/countries/:idCountry" element={<Detail/>}/>
        <Route path="/countries/activities" element={<ActivityPage/>}/>
        <Route path="/countries/activities/:idActivity" element={<ActivityDetail/>}/>
      </Route>
    </Routes>
  )
}

export default App
