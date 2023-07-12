import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar'

function App() {
  if(!JSON.parse(sessionStorage.getItem("user"))) {
    sessionStorage.setItem("user", JSON.stringify('default'));
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
