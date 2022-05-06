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
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';

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
    // remove the token from local storage
    if(localStorage.getItem('jwt')) localStorage.removeItem('jwt')
    // set user state to be null
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
          {/* conditionally render the profile page depending on if user is logged in or not */}
          <Route 
            path='/profile'
            element={currentUser ? <Profile currentUser={currentUser}/> : <Navigate to='/login'/>}
          />

          {/* <Route 
            path='/profile'
            element={<Profile />}
          /> */}

          <Route 
            path='/register'
            element={<Register 
              currentUser={currentUser} 
              setCurrentUser={setCurrentUser}
              />}
          />
        </Routes>
      </div>

    </Router>
    
  )
}

export default App;
