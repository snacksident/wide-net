import { Link } from "react-router-dom"

export default function Navbar ({handleLogout, currentUser}) {
    //if user is logged in
    const loggedIn = (
        <>
                {/* if user is logged in....... */}
                <Link to="/">
                    {/* todo - app function to logout */}
                    <span onClick={handleLogout}>log out</span>
                </Link>

                <Link to="/profile">profile</Link>
        </>
    )
    //if user is logged out
    const loggedOut = (
        <>
            < Link to='/register'>register</Link>
                <Link to='/login'>login</Link>
        </>
    )
    return(
            <nav>
                <Link to="/">User App</Link>

                {currentUser ? loggedIn : loggedOut }
            </nav>
    )
}