import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Welcome from './components/pages/Welcome'
import Register from './components/pages/Register'
import Bugs from './components/pages/Bugs'
import { useEffect, useState, useContext } from 'react'
import jwt_decode from 'jwt-decode'


function App() {
  //state w/user data when user is logged in
  const [currentUser, setCurrentUser] = useState(null)

  //useEffect that handles localstorage if user navigates away from page/refreshes
  useEffect(()=>{
    const token = localStorage.getItem('jwt')
    if(token){
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  },[])

  //logout handler function that deletes a token from localstorage
  const handleLogout = () => {
    if(localStorage.getItem('jwt')) localStorage.removeItem('jwt')
    setCurrentUser(null)
  }

  return (
    
    <Router>
      <Navbar 
        handleLogout={handleLogout}
        currentUser={currentUser}
      />
      <div className="app">
        
        <Routes>
          <Route 
            path="/"
            element={<Welcome />}
          />

          <Route 
            path='/login'
            element={<Login 
              currentUser={currentUser} 
              setCurrentUser={setCurrentUser}
            />}
          />
          <Route 
            path='/profile'
            element={currentUser ? <Profile currentUser={currentUser}/> : <Navigate to='/login'/>}
          />
          <Route 
            path='/register'
            element={<Register 
              currentUser={currentUser} 
              setCurrentUser={setCurrentUser}
              />}
          />
            <Route
              path="/bugs"
              element={<Bugs 
                currentUser={currentUser}
              />}
            />
        </Routes>
        
      </div>
    </Router>
    
  )
}

export default App;
