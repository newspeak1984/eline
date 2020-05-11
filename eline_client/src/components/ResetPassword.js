import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
const logo = require('../graphics/eline.png')
const baseDesign = require('../graphics/myhumps.png')

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            confirmPassword: ''
        }
    }

    onChangeNewPassword = (e) => {
        this.setState({
            newPassword: e.target.value
        })
    }

    onChangeConfirmPassword = (e) =>{
        this.setState({
            confirmPassword: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const values = queryString.parse(this.props.location.search);
        axios.post('http://localhost:5000/login/resetPassword?token=' + values.token, { newPassword: this.state.newPassword})
        .then(res => {
            console.log(res);
            alert("Successfully updated your password!");
            window.location = '/login'
        }).catch(e => {
            alert("Sorry, something went wrong!");
            console.log(e);
        });
        
    }
    
    check  = () =>{
        let pass = document.getElementById('password'); 
        let confirm = document.getElementById('password_confirm');

        if (pass.value && confirm.value && pass.value !== confirm.value){
            confirm.setCustomValidity('Password Must be Matching.');
        }
        else{
            confirm.setCustomValidity('');
        }
    }

    render() {
        return (
            <div style={{"textAlign": 'center'}}> 
                <img src={logo} class="elineLogo" style={styles.elineLogo}></img>
                <p style={styles.resetText}>Reset Password</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="password"
                            placeholder="New Password"
                            id="password"
                            required
                            className="InputForm"
                            value={this.newPassword}
                            onChange={this.onChangeNewPassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            placeholder="Confirm Password"
                            id="password_confirm"
                            required
                            onInput={this.check}
                            className="InputForm"
                            value={this.confirmPassword}
                            onChange={this.onChangeConfirmPassword}
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

export default ResetPassword;