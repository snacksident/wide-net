export default function BugDisplay({name, description, location, submittedOn, priority, status, id}) {
    return(
        <div className="bug-details">
            <h1>{name}</h1>
            <h2>{description}</h2>
            <p>location: {location}</p>
            <p>submitted on: {submittedOn}</p>
            <p>priority: {priority}</p>
            <p>status: {status}</p>
            <p>id: {id}</p>
        </div>
    )
}