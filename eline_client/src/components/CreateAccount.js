import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from 'axios';
import { verifyAuth } from "../actions";
import './styles.css';
const logo = require('../graphics/eline.png')
const baseDesign = require('../graphics/myhumps.png')

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

        axios.post('https://e-line-app.herokuapp.com/createAccount/', user)
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

    const styles = {
        "elineLogo": {
            marginTop: '20px',
            marginBottom: '33px',
            width: '60%'
        },
        "divider": {
            border: '1px solid #A9A9A9',
            width: '65%',
            height: '0px',
            display: 'inline-block'
        },
        "signIn": {
            fontFamily: 'Helvetica',
            fontSized: '14px',
            lineHeight: '16px',
            color: '#009F66',
        },
        "bottomText": {
            fontFamily: 'Helvetica',
            fontSized: '14px',
            lineHeight: '16px',
            color: '#A4A4A4',
            marginTop: '10px'
        },
    }

    return (
        isVerifying ? <h2>Loading</h2>
        : isAuthenticated ? <h2>You are already logged in</h2>
        : <div style={{ textAlign: 'center' }}>
            <a href="https://e-line-app.herokuapp.com/">
                <img src={logo} class="elineLogo" style={styles.elineLogo}></img>
            </a>
            <form onSubmit={onSubmit}>
                <div className="form-group" style={{marginBottom: '20px'}}>
                    <input type="email"
                        placeholder="Email"
                        required
                        className="InputForm"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className="form-group" style={{marginBottom: '20px'}}>
                    <input type="text"
                        placeholder="Username"
                        required
                        className="InputForm"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group" style={{marginBottom: '20px'}}>
                    <input type="password"
                        placeholder="Password"
                        id="password"
                        required
                        className="InputForm"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className="form-group" style={{marginBottom: '20px'}}>
                    <input type="password"
                        placeholder="Confirm Password"
                        id="password_confirm"
                        required
                        onInput={check}
                        className="InputForm"
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                    />
                </div>
                <div className="form-group" style={{marginBottom: '20px'}}>
                    <input type="tel"
                        placeholder="Phone Number"
                        required
                        className="InputForm"
                        value={phone}
                        onChange={onChangePhone}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Sign Up" className="GreenButton" />
                </div>
            </form>
            <div style={styles.divider}></div>
            <p style={styles.bottomText}>Already have an account? <a href="https://e-line-app.herokuapp.com/login/" style={styles.signIn}>Sign In</a></p>
            <img src={baseDesign} class="fixBottom"></img>
        </div>
    )

}
