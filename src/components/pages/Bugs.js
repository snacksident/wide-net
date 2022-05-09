import axios from 'axios'
import { useState } from 'react'

export default function Bugs({currentUser}) {
    const [form,setForm] = useState({
        name: "",
        description: "",
        location: "",
        user: {currentUser}
    })
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
            
        }
    }
    // const currentBugs = 

    return(
        <>
            <h1>bugs</h1>
            <div className="current-bugs">
                
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