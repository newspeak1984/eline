import React, { useState, useEffect } from "react";
import axios from 'axios';

function AdminLogin() {

    const[loginEmail, setLoginEmail] = useState('');
    const[loginPassword, setLoginPassword] = useState('');
    const[successfulLogin, setSuccessfulLogin] = useState(false);

    const onChangeLoginEmail = (e) => {
        setLoginEmail(e.target.value);
    }

    const onChangeLoginPassword = (e) => {
        setLoginPassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const credentials = {
            loginEmail: loginEmail,
            loginPassword: loginPassword,
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:5000/admin/login', credentials)
        .then(res => {
            console.log(res);
            setSuccessfulLogin(true);
            window.location = '/admin/'
        }).catch(e => {
            console.log(e);
        });

        setLoginEmail('');
        setLoginPassword('');
    }

    return(
        <div>
            <h3>Admin Login</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email"
                        required
                        className="form-control"
                        onChange={onChangeLoginEmail}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password"
                        id="password"
                        required
                        className="form-control"
                        onChange={onChangeLoginPassword}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default AdminLogin;