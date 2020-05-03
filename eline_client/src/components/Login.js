import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { connect, useDispatch, useStore, useSelector, shallowEqual } from "react-redux";
import { loginUser } from "../actions";

export default function Login() {
    const dispatch = useDispatch();
    
    const { user, isAuthenticated } = useSelector(state => ({
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }), shallowEqual)

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

        axios.post('http://localhost:5000/login/', credentials)
        .then(res => {
            console.log(res);
            setSuccessfulLogin(true);
            dispatch(loginUser(res.data));
            window.location = '/home';
        }).catch(e => {
            console.log(e);
        });
    }

    return isAuthenticated ? <div><h2>You are already logged in</h2></div>
    : (
        <div>
            <h3>Login</h3>
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
