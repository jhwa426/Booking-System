import React, { useState } from 'react'
import "./Login.css";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [IsLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    async function login() {
        if (email === "" || password === "") {
            setError("Email and Password cannot be empty");
            return;
        }

        const user = {
            email,
            password,
        }
        try {
            setIsLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, user);
            const registeredAccount = response.data;
            setIsLoading(false);

            localStorage.setItem("currentUser", JSON.stringify(registeredAccount));
            window.location.href = "/profile";

        } catch (error) {
            setIsLoading(false);
            setError(true);
        }
    }

    return (
        <>
            <div className="row login-content">
                <div className="col-md-5 mt-5">
                    {IsLoading && <h1><Loader />Login...</h1>}
                    {error && <Error message="Invalid Credentials" />}
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
                            type="password"
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
        </>
    );
}

export default Login;