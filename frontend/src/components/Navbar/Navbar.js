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

    return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Booking.Football</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"><i class="fas fa-bars" style={{ color: "white" }}></i></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mr-5">
                            {user ? (
                                <>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Hello, {user.name}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="/profile">Profile</a>
                                            <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/register">Register</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/login">Login</a>
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