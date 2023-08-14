import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'

function WithNavBar() {

  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default WithNavBar