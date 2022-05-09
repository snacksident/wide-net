import axios from 'axios'
import { useState } from 'react'

export default function Bugs() {
    const [form,setForm] = useState({
        name: "",
        description: "",
        location: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return(
        <>
            <h1>bugs</h1>
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
        </>
    )
}