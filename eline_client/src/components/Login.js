import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";

import Button from "@material-ui/core/Button";

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            loginEmail: '',
            loginPassword: '',
            successfulLogin: false
        }
    }
    handleChangeLogingEmail = (e) => {
        this.setState({
            loginEmail: e.target.value
        });
    }

    handleChangeLoginPassword = (e) => {
        this.setState({
            loginPassword: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;

        const credentials = {
            loginEmail: this.state.loginEmail,
            loginPassword: this.state.loginPassword,
        }

        dispatch(loginUser(credentials))

        // this.setState({
        //     loginEmail: '',
        //     loginPassword: ''
        // })
    }

    render(){
        const { isAuthenticated } = this.props;
        return(
            <div>
                <h3>Login</h3>
                <form>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            required
                            className="form-control"
                            onChange={this.handleChangeLogingEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            id="password"
                            required
                            className="form-control"
                            onChange={this.handleChangeLoginPassword}
                        />
                    </div>
                    <div className="form-group">
                        <Button onClick={this.handleSubmit} variant="outlined">Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
}

export default (connect(mapStateToProps)(Login));