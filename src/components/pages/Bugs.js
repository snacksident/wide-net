import axios from 'axios'
import { useState, useEffect } from 'react'
import BugDisplay from '../BugDisplay'
import BugForm from '../BugForm'

export default function Bugs({currentUser}) {
    //state vars
    const [bugs, setBugs] = useState([])
    const [showForm, setShowForm] = useState(false)
    //get all current bugs, create BugDisplay components with current list
    useEffect(()=>{
        const getBugs = async () =>{
            let theBugs = await axios.get(`${process.env.REACT_APP_SERVER_URL}api-v1/bugs`)
            setBugs(theBugs.data)
        }
        getBugs()
    },[])

    const allBugs = bugs.map((bug,i)=>{
        return(
            <BugDisplay 
                key={i}
                name={bug.name}
                description={bug.description}
                location={bug.location}
                submittedOn={bug.date}
                priority={bug.priority}
                status={bug.status}
                id={bug._id}
            />
        )
    })

    return(
        <>
            <h1>bugs</h1>
            <div className="current-bugs">
                <p>current bugs:</p>
                {allBugs}
            </div>
            <button onClick={()=>setShowForm(!showForm)}>add new bug</button>
            {showForm
                && <BugForm currentUser={currentUser} />
            }
        </>
    )
}