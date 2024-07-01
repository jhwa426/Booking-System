import React, { useState } from 'react'
import "./Register.css";
import axios from "axios";
import Success from "../components/Success/Success";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";

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
                const register = axios.post("/api/users/register", user).data;
                setIsLoading(false);
                setSuccess(true);

                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

            } catch (error) {
                setIsLoading(false);
                setError(true);
            }
        } else {
            alert("Passwords are not matched! Please review your password");
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
                            placeholder="Username" value={name}
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