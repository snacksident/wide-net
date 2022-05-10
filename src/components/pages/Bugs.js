import axios from 'axios'
import { useState, useEffect } from 'react'
import BugDisplay from '../BugDisplay'
import BugForm from '../BugForm'

export default function Bugs({currentUser}) {
    const [bugs, setBugs] = useState([])
    //get all current bugs, create BugDisplay components with current list
    useEffect(()=>{
        console.log('loaded')
        const getBugs = async () =>{
            let theBugs = await axios.get(`${process.env.REACT_APP_SERVER_URL}api-v1/bugs`)
            console.log(theBugs)
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
            <BugForm 
                currentUser={currentUser}
            />
        </>
    )
}