export default function BugDisplay({name, description, location, submittedOn, priority, status}) {
    return(
        <div className="bug-details">
            <h1>{name}</h1>
            <h2>{description}</h2>
            {location}
            {submittedOn}
            {priority}
            {status}
        </div>
    )
}