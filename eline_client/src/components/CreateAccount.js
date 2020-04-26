import React from "react";
import axios from 'axios'

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            phone: '',
            currentStore: ''
        }
    }

    componentDidMount() {
        this.setState({
            currentStore: "Costco"
        });
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onChangeConfirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    onChangePhone = (e) => {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeStore = (e) => {
        this.setState({
            currentStore: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            phone: this.state.phone,
            currentStore: this.state.currentStore,
        }

        console.log(user);

        axios.post('http://localhost:5000/createAccount/', user)
        .then(res => {
            console.log(res.data);
        }).catch(e => {
            alert("Sorry, that email/phone number may already be registered");
            console.log(e);
        });

        this.setState({
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            phone: ''
        })

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
                <h3>Create New Account</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            id="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="password"
                            id="password_confirm"
                            required
                            onInput={this.check}
                            className="form-control"
                            value={this.state.confirmPassword}
                            onChange={this.onChangeConfirmPassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number: </label>
                        <input type="tel"
                            required
                            className="form-control"
                            value={this.state.phone}
                            onChange={this.onChangePhone}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Account" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateAccount;