import React, { useState } from "react";
import axios from 'axios';
const logo = require('../graphics/eline.png')
const baseDesign = require('../graphics/myhumps.png')

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

    const styles = {
        "elineLogo": {
            marginTop: '20px',
            marginBottom: '33px',
            width: '60%'
        },
        "resetText":{
            textAlign: 'center',
            fontFamily: 'Helvetica',
            fontSize: '31px',
            lineHeight: '42px',
            marginTop: '30px',
        },
    }

    return (
        <div style={{"textAlign": 'center'}}>
            <img src={logo} class="elineLogo" style={styles.elineLogo}></img>
            <p style={styles.resetText}>Reset Password Form</p>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email"
                        placeholder="Email"
                        required
                        style={{"marginTop": '20px', "marginBottom": '20px'}}
                        className="InputForm"
                        onChange={onChangeRecoverEmail}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Send" className="GreenButton" />
                </div>
            </form>
            <img src={baseDesign} class="fixBottom"></img>
        </div>
    )
}