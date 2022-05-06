import { useState } from "react"
import axios from "axios"
import jwt_decode from 'jwt-decode'
import { Navigate } from "react-router-dom"

export default function Login ({currentUser, setCurrentUser}) {
    const [form,setForm] = useState({
        email: "",
        password: ""
    })
    const [msg,setMsg] = useState('')

    const handleFormSubmit = async e => {
        e.preventDefault()
        try {
            //post to the backend with form data to log in
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}api-v1/users/login`, form)
            //decode the token that is sent to us
            const { token } = response.data
            const decoded = jwt_decode(token)
            //save the token in local storage
            localStorage.setItem('jwt',token)
            //set the app state to the logged in user
            setCurrentUser(decoded)
        } catch (error) {
            //handle errors such as
            if(error.response.status === 400){
                setMsg(error.response.data.msg)
            }
            console.log(error)
        }
    }

    //navigate to the user's profile if currentUser is not null
    if( currentUser ) return <Navigate to="/profile"/>

    return(
        <div>
            <h3>login form</h3>
            <p>{msg ? `the server has a message for you: ${msg}` : ''}</p>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">email</label>
                <input 
                type="email" 
                id="email" 
                placeholder="user@domain.com" 
                onChange={e=>setForm({...form, email: e.target.value})}
                value={form.email}
                />
                <label htmlFor="password">password</label>
                <input 
                type="password" 
                id="password" 
                placeholder="" 
                onChange={e=>setForm({...form, password: e.target.value})}
                value={form.password}
                />
                <input type="submit" value="log in" />
            </form>
        </div>
    )
}