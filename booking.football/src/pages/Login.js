import React, { useState } from 'react'
import "./Login.css";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        const user = {
            name,
            password,
        }
        console.log(user);
    }

    return (
        <div className="row login-content">
            <div className="col-md-5 mt-5">
                <div className="bs">
                    <h2 className="login-title">Login</h2>
                    <input
                        type="text"
                        className="form-control login-form"
                        placeholder="Email" value={name}
                        onChange={(event) => { setName(event.target.value) }}
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