import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from 'axios';
import { verifyAdminAuth } from "../actions";
const logo = require('../graphics/eline.png')
const baseDesign = require('../graphics/myhumps.png')

function AdminLogin() {
    const dispatch = useDispatch();

    const { isAdminAuthenticated, isVerifying, adminId, storeId } = useSelector(state => ({
        isVerifying: state.auth_admin.isVerifying,
        isAdminAuthenticated: state.auth_admin.isAdminAuthenticated,
        adminId: state.auth_admin.adminId,
        storeId: state.auth_admin.storeId,
    }), shallowEqual)

    const[loginEmail, setLoginEmail] = useState('');
    const[loginPassword, setLoginPassword] = useState('');

    useEffect(() => {
        dispatch(verifyAdminAuth());
    }, [])

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
            window.location = '/admin/'
        }).catch(e => {
            console.log(e);
            alert("Incorrect email and/or password")
        });

        setLoginEmail('');
        setLoginPassword('');
    }

    const styles = {
        "elineLogo": {
            marginTop: '20px',
            marginBottom: '33px',
            width: '60%'
        },
        "adminText":{
            textAlign: 'center',
            fontFamily: 'Helvetica',
            fontSize: '31px',
            lineHeight: '42px',
            marginTop: '30px',
        },
    }

    return(
        isVerifying 
        ? <h2>Loading</h2>
        : isAdminAuthenticated ? <h2>You are already logged in as an admin for {storeId}</h2>
            : <div style={{"textAlign": 'center'}}>
                <a href="http://localhost:3000">
                    <img src={logo} class="elineLogo" style={styles.elineLogo}></img>
                </a>
                <p style={styles.adminText}>Admin Login</p>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email"
                            placeholder="Email"
                            style={{"marginTop": '20px', "marginBottom": '10px'}}
                            required
                            className="InputForm"
                            onChange={onChangeLoginEmail}
                        />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            placeholder="Password"
                            style={{"marginTop": '10px', "marginBottom": '20px'}}
                            id="password"
                            required
                            className="InputForm"
                            onChange={onChangeLoginPassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="GreenButton" />
                    </div>
                </form>
                <img src={baseDesign} class="fixBottom"></img>
            </div>
    )
}

export default AdminLogin;