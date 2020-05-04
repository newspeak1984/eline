import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from 'axios';
import { verifyAdminAuth } from "../actions";

function AdminCreateAccount() {
    const dispatch = useDispatch();

    const { isAdminAuthenticated, isVerifying, adminId, storedStoreId } = useSelector(state => ({
        isVerifying: state.auth_admin.isVerifying,
        isAdminAuthenticated: state.auth_admin.isAdminAuthenticated,
        adminId: state.auth_admin.adminId,
        storedStoreId: state.auth_admin.storeId,
    }), shallowEqual)

    const [storeId, setStoreId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        dispatch(verifyAdminAuth());
    },[])

    const onChangeStoreId = (e) => {
        setStoreId(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const admin = {
            email: email,
            password: password,
            storeId: storeId,
        }

        axios.post('http://localhost:5000/admin/add', admin)
        .then(res => {
            console.log(res.data);
            window.location = '/admin/login'
        }).catch(e => {
            alert("StoreId is incorrect or email already exists")
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
        : isAdminAuthenticated ? <h2>You are already logged in as an admin for {storedStoreId}</h2>
        : <div>
            <h3>Create New Admin</h3>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label>StoreId: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={storeId}
                        onChange={onChangeStoreId}
                    />
                </div>
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
                    <input type="submit" value="Create Admin" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )

}

export default AdminCreateAccount;