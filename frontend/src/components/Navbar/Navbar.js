import React from 'react'
import "./Navbar.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Navbar = () => {
    const currentUser = localStorage.getItem("currentUser");
    let user = null;
    if (currentUser && currentUser !== "null" && currentUser !== "undefined") {
        user = JSON.parse(currentUser);
    }

    function logout() {
        localStorage.removeItem("currentUser");
        window.location.href = "/login";
    }

    function admin() {
        window.location.href = "/admin";
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Booking.Football</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><i className="fas fa-bars" style={{ color: "white" }}></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-5">
                            {user ? (
                                <>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Hello, {user.name}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {user && user.isAdmin && (<a className="dropdown-item" href="/admin" onClick={admin}>Admin</a>)}
                                            <a className="dropdown-item" href="/profile">My Profile</a>
                                            <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/register">Register</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">Login</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;