import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { loginUser, verifyAuth } from "../actions";
import './styles.css';
import { config } from '../Constants';

const logo = require('../graphics/eline.png')
const baseDesign = require('../graphics/myhumps.png')

export default function Login() {
    const dispatch = useDispatch();

    const { user, isAuthenticated, isVerifying } = useSelector(state => ({
        user: state.auth_customer.user,
        isAuthenticated: state.auth_customer.isAuthenticated,
        isVerifying: state.auth_customer.isVerifying
    }), shallowEqual)

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    useEffect(() => {
        dispatch(verifyAuth());
        if(isAuthenticated){
            window.location = '/home'
        }
    }, [])

    const onChangeLoginEmail = (e) => {
        setLoginEmail(e.target.value);
    }

    const onChangeLoginPassword = (e) => {
        setLoginPassword(e.target.value);
    }

    const onForgotPassword = () => {
        window.location = '/login/forgotPassword'
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const credentials = {
            loginEmail: loginEmail,
            loginPassword: loginPassword,
        }

        axios.defaults.withCredentials = true;

        axios.post(config.url.API_URL + '/login/', credentials)
            .then(res => {
                dispatch(loginUser(res.data));
                window.location = '/home';
            }).catch(e => {
                alert("Incorrect email and/or password")
            });
    }

    const styles = {
        "forgotPassword": {
            marginLeft: '40%',
            marginTop: '8px',
            padding: '0px',
            border: 'none',
            background: 'none',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#009F66'
        },
        "divider": {
            border: '1px solid #A9A9A9',
            width: '65%',
            height: '0px',
            display: 'inline-block'
        },
        "bottomText": {
            fontFamily: 'Helvetica',
            fontSized: '14px',
            lineHeight: '16px',
            color: '#A4A4A4',
            marginTop: '10px'

        },
        "signUp": {
            fontFamily: 'Helvetica',
            fontSized: '14px',
            lineHeight: '16px',
            color: '#009F66',
        },
        "elineLogo": {
            marginTop: '78px',
            marginBottom: '63px',
            width: '60%'
        }
    }

    return isVerifying ? <h2>Loading</h2>
        : (isAuthenticated ? <div><h2>You are already logged in</h2></div>
            : <div style={{ textAlign: 'center' }}>
                <a href={config.url.ELINE_URL}>
                    <img src={logo} class="elineLogo" style={styles.elineLogo}></img>
                </a>
                <form onSubmit={onSubmit}>
                    <div className="form-group" style={{marginBottom: '20px'}}>
                        <input type="email"
                            placeholder="Email"
                            required
                            className="InputForm"
                            onChange={onChangeLoginEmail}
                        />
                    </div>
                    <div className="form-group" style={{marginBottom: '20px'}}>
                        <input type="password"
                            placeholder="Password"
                            id="password"
                            required
                            className="InputForm"                            
                            onChange={onChangeLoginPassword}
                        />
                        <button onClick={onForgotPassword} style = {styles.forgotPassword}>Forgotten Password?</button>
                    </div>                    
                    <div className="form-group">
                        <input type="submit" value="Login" className="GreenButton" />
                    </div>
                </form>
                <div style={styles.divider}></div>
                <p style={styles.bottomText}>Don't have an account? <a href={config.url.ELINE_URL + "/createAccount/"} style={styles.signUp}>Sign Up</a></p>
                <img src={baseDesign} class="fixBottom"></img>
            </div>
        )
}
