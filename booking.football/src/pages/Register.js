import React, { useState } from 'react'
import "./Register.css";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function register() {
        if (password === confirmPassword) {
            const user = {
                name,
                email,
                password,
                confirmPassword,
            }
            try {
                const register = axios.post("/api/users/register", user).data;
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Passwords are not matched! Please review your password");
        }
    }

    return (
        <div className="row register-content">
            <div className="col-md-5 mt-5">
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
                        type="text"
                        className="form-control register-form"
                        placeholder="Password" value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        required
                    />
                    <input
                        type="text"
                        className="form-control register-form"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(event) => { setConfirmPassword(event.target.value) }}
                        required
                    />

                    <button className="btn btn-primary register-form" onClick={register}>Register</button>

                </div>
            </div>
        </div>
    );
}

export default Register;