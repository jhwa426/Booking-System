import React, { useState } from 'react'
import "./Register.css";
import axios from "axios";
import Success from "../components/Success/Success";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import Swal from 'sweetalert2'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState("");

    const [IsLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function registerUser() {
        if (password === confirmPassword) {
            const user = {
                name,
                email,
                password,
                confirmPassword,
            }
            try {
                setIsLoading(true);
                //// Localhost
                // const register = axios.post("/api/users/register", user).data;

                //// Backend URL
                // const register = axios.post("https://booking-system-backend-ee3i.onrender.com/api/users/register", user).data;

                const register = axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, user).data;

                setIsLoading(false);
                setSuccess(true);

                Swal.fire({
                    title: 'Successful',
                    text: 'Your account has been successfully registered!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(response => {
                    window.location.href = "/login";
                });

                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

            } catch (error) {
                setIsLoading(false);
                setError(true);
                console.error('Registration error:', error);
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Passwords are not matched! Please review your password',
                icon: 'error',
                confirmButtonText: 'Close'
            })
        }
    }

    return (
        <>
            {IsLoading && (<Loader />)}
            {error && (<Error />)}
            <div className="row register-content">
                <div className="col-md-5 mt-5">
                    {success && (<Success message="Registration Success!" />)}
                    <div className="bs">
                        <h2 className="registration-title">Registration</h2>
                        <input
                            type="text"
                            className="form-control register-form"
                            placeholder="Full name" value={name}
                            onChange={(event) => { setName(event.target.value) }}
                            required
                        />
                        <input
                            type="text"
                            className="form-control register-form"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                            required
                        />
                        <input
                            type="password"
                            className="form-control register-form"
                            placeholder="Password" value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            required
                        />
                        <input
                            type="password"
                            className="form-control register-form"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(event) => { setConfirmPassword(event.target.value) }}
                            required
                        />

                        <button className="btn btn-primary register-form" onClick={registerUser}>Register</button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;