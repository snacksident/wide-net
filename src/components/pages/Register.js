import axios from "axios"
import { useState } from "react"
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Register ({currentUser, setCurrentUser}) {
    const [form,setForm] = useState({
        email: "",
        password: "",
        name: "",
        passwordConfirmation: ""
    })
    const [msg,setMsg] = useState('')
    const [passMsg,setPassMsg] = useState('')

    const handleFormSubmit = async e => {
        e.preventDefault()
        
        try {
            if(form.password === form.passwordConfirmation){
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}api-v1/users/register`, form)
                const { token } = response.data
                const decoded = jwt_decode(token)
                //save the token in local storage
                localStorage.setItem('jwt',token)
                //set the app state to the logged in user
                setCurrentUser(decoded)
            }else{
                setPassMsg(`the passwords do NOT match`)
            }
        } catch (error) {
            if(error.response.status === 400){
                setMsg(error.response.data.msg)
            }else if(error.response.status===409){
                setMsg(error.response.data.msg)
            }
            console.log(error)
        }
    }
    
    if( currentUser ) return <Navigate to="/profile"/>

    return(
        <div>
            <h3>sign up @ this sick app</h3>
            <p>{passMsg}</p>
            <p>{msg ? `the server has a message for you: ${msg}` : ''}</p>
            {/* <p>{!checkPasswords ? `passwords must match`: ``}</p> */}

            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">email</label>
                <input
                    type="email"
                    value={form.email}
                    onChange={e=>setForm({...form, email: e.target.value})}
                    id="email"
                    placeholder="user@domain.com"
                />

                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    onChange={e=>setForm({...form, password: e.target.value})}
                    value={form.password}
                />

                <label htmlFor="passwordConfirmation">password confirmation</label>
                <input
                    type="password"
                    id="passwordConfirmation"
                    onChange={e=>setForm({...form, passwordConfirmation: e.target.value})}
                    value={form.passwordConfirmation}
                />
                <input type="submit" value="register" />
            </form>
        </div>
    )
}