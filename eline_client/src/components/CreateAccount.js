import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from 'axios';
import { verifyAuth } from "../actions";

export default function CreateAccount() {
    const dispatch = useDispatch();

    const { user, isAuthenticated, isVerifying } = useSelector(state => ({
        user: state.auth_customer.user,
        isAuthenticated: state.auth_customer.isAuthenticated,
        isVerifying: state.auth_customer.isVerifying
    }), shallowEqual)

    useEffect(() => {
        dispatch(verifyAuth());
    }, [])
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            username: username,
            password: password,
            phone: phone
        }

        axios.post('http://localhost:5000/createAccount/', user)
        .then(res => {
            console.log(res.data);
            window.location = '/home/'
        }).catch(e => {
            alert("Sorry, that email/phone number may already be registered");
            console.log(e);
        });
    }

    const check  = () =>{
        let pass = document.getElementById('password'); 
        let confirm = document.getElementById('password_confirm');

        if (pass.value && confirm.value && pass.value !== confirm.value){
            confirm.setCustomValidity('Password Must be Matching.');
        }
        else{
            confirm.setCustomValidity('');
        }
    }

    return (
        isVerifying ? <h2>Loading</h2>
        : isAuthenticated ? <h2>You are already logged in</h2>
        : <div>
            <h3>Create New Account</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email"
                        required
                        className="form-control"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password"
                        id="password"
                        required
                        className="form-control"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password: </label>
                    <input type="password"
                        id="password_confirm"
                        required
                        onInput={check}
                        className="form-control"
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number: </label>
                    <input type="tel"
                        required
                        className="form-control"
                        value={phone}
                        onChange={onChangePhone}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Account" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )

}
