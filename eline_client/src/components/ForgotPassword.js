import React, { useState } from "react";
import axios from 'axios';

export default function ForgotPassword() {
    const [recoverEmail, setRecoverEmail] = useState();

    const onChangeRecoverEmail = (e) => {
        setRecoverEmail(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/login/forgotPassword', { "email": recoverEmail })
            .then(res => {
                alert('Sent Recovery Email!')
                window.location = '/login';
            }).catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <h1>Reset Password Form</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email"
                        required
                        className="form-control"
                        onChange={onChangeRecoverEmail}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Send" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}