import { useState,useEffect } from "react"
import axios from 'axios'
export default function Profile ({currentUser}) {
    const [msg,setMsg] = useState('')
    //use useEffect to get data from the backend
    useEffect(()=>{
        (async ()=>{
            try {
                //get token from local storage
                const token = localStorage.getItem('jwt')
                // console.log(token)
                //make auth headers
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                //hit the auth locked endpoint
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api-v1/users/auth-locked`,options)
                //set the data from the server in state
                setMsg(response.data.msg)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return(
        <div>
            <h3>{currentUser.name}'s profile</h3>
            <p>your email is {currentUser.email}</p>
            <h4>message from auth locked route is</h4>
            <h6>{msg}</h6>
        </div>
    )
}