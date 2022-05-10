import axios from 'axios'
import { useState, useEffect } from 'react'
import BugDisplay from '../BugDisplay'

export default function Bugs({currentUser}) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        location: "",
        user: {currentUser}
    })
    const [bugs, setBugs] = useState([])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}api-v1/bugs/new-bug`, form)
            setForm({
                name: "",
                description: "",
                location: ""
            })
        } catch (error) {
            console.log(error)
        }
    }
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
            <div className="bug-add-form">
                <p>add new bug here:</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">name</label>
                    <input 
                        type="text"
                        value={form.name}
                        onChange={e=>setForm({...form,name: e.target.value})}
                        id="name"
                        placeholder="add bug name here"
                    />
                    <label htmlFor="description">description</label>
                    <textarea 
                        value={form.description}
                        onChange={e=>setForm({...form, description: e.target.value})}
                        id="description"
                        placeholder="details about bug here!"
                    />
                    <input 
                        type="text"
                        value={form.location}
                        onChange={e=>setForm({...form, location: e.target.value})}
                        id="location"
                        placeholder="bug location"
                    />
                    <input type="submit" value="submit" />
                </form>
            </div>
        </>
    )
}