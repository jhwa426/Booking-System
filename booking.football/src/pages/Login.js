import React, { useState } from 'react'
import "./Login.css";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        const user = {
            email,
            password,
        }
        try {
            const registeredAccount = axios.post("/api/users/login", user).data;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="row login-content">
            <div className="col-md-5 mt-5">
                <div className="bs">
                    <h2 className="login-title">Login</h2>
                    <input
                        type="text"
                        className="form-control login-form"
                        placeholder="Email" value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                        required
                    />
                    <input
                        type="text"
                        className="form-control login-form"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        required
                    />

                    <button className="btn btn-primary login-form" onClick={login}>Login</button>

                </div>
            </div>
        </div>
    );
}

export default Login;