import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from 'axios';
import { verifyAdminAuth } from "../actions";

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

    return(
        isVerifying 
        ? <h2>Loading</h2>
        : isAdminAuthenticated ? <h2>You are already logged in as an admin for {storeId}</h2>
            : <div>
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