import { useState } from "react"
import Select from 'react-select'
import BugForm from "./BugForm"

export default function BugDisplay({name, description, location, submittedOn, priority, status, id}) {
    //state vars
    const [showForm,setShowForm] = useState(false)
    const [form, setForm] = useState({
        name: {name},
        description: {description},
        location: {location},
        priority: {priority},
        status: {status}
    })

    const statusOptions = [
        { value: 'Open', label: 'Open' },
        { value: 'Assigned', label: 'Assigned' },
        { value: 'Completed', label: 'Completed' }
    ]
    const priorityOptions = [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
    ]
    const handleClick = (e) => {
        console.log(`edit ${e.target.value}`)
        setShowForm(!showForm)
    }
    const handleSubmit = (e) => {
        console.log(`attempting to submit edit bug form`)
    }

    const editView = (
        <>
        <p>edit view</p>
            {/* need to add a form that is pre-populated with current bugs info(access to add new notes, change status, etc) */}
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
    const standardView = (
        <>
            <h1>{name}</h1>
            <h2>{description}</h2>
            <p>location: {location}</p>
            <p>submitted on: {submittedOn}</p>
            <p>priority: {priority}</p>
            <Select options={priorityOptions} />
            <p>status: {status}</p>
            <Select options={statusOptions} />
            <p>id: {id}</p>
        </>
    )
    return(
        <div className="bug-details">
            {!showForm ?
                standardView : editView
            }
        <button onClick={handleClick} value={id}>edit this bug</button>
        </div>
    )
}