import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { connect, useDispatch, useStore } from "react-redux";
import { loginUser } from "../actions";

function Login() {
    const dispatch = useDispatch();
    const store = useStore();

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

            
        }).catch(e => {
            console.log(e);
        });
    }

    return(
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

function mapStateToProps(state) {
    return {
        user: state.auth.user
    };
}

export default (connect(mapStateToProps)(Login));