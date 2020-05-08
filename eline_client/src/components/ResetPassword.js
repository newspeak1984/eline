import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

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
            <div>
                <h1>Reset Password</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>New Password: </label>
                        <input type="password"
                            id="password"
                            required
                            className="form-control"
                            value={this.newPassword}
                            onChange={this.onChangeNewPassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="password"
                            id="password_confirm"
                            required
                            onInput={this.check}
                            className="form-control"
                            value={this.confirmPassword}
                            onChange={this.onChangeConfirmPassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Send" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default ResetPassword;