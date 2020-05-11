import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from 'axios';
import { verifyAdminAuth } from "../actions";
const logo = require('../graphics/eline.png')
const baseDesign = require('../graphics/myhumps.png')

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

    return (
        isVerifying ? <h2>Loading</h2>
        : isAdminAuthenticated ? <h2>You are already logged in as an admin for {storedStoreId}</h2>
        : <div style={{"textAlign": 'center'}}>
            <a href="http://localhost:3000">
                    <img src={logo} class="elineLogo" style={styles.elineLogo}></img>
            </a>
            <p style={styles.adminText}>Create New Admin</p>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <input type="text"
                        placeholder="StoreId"
                        required
                        style={{"marginTop": '20px', "marginBottom": '10px'}}
                        className="InputForm"
                        value={storeId}
                        onChange={onChangeStoreId}
                    />
                </div>
                <div className="form-group">
                    <input type="email"
                        placeholder="Email"
                        required
                        style={{"marginTop": '10px', "marginBottom": '10px'}}
                        className="InputForm"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>                
                <div className="form-group">
                    <input type="password"
                        placeholder="Password"
                        id="password"
                        required
                        style={{"marginTop": '10px', "marginBottom": '10px'}}
                        className="InputForm"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className="form-group">
                    <input type="password"
                        placeholder="Confirm Password"
                        id="password_confirm"
                        required
                        style={{"marginTop": '10px', "marginBottom": '20px'}}
                        onInput={check}
                        className="InputForm"
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Admin" className="GreenButton" style={{"width": '180px'}}/>
                </div>
            </form>
            <img src={baseDesign} class="fixBottom"></img>
        </div>
    )

}

export default AdminCreateAccount;