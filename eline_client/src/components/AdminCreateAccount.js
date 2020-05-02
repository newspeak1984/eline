import React, { useState, useEffect } from "react";
import axios from 'axios';

function AdminCreateAccount() {
    const [storeId, setStoreId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {

    })

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
        <div>
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