import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { loginUser } from "../actions";

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loginEmail: '',
            loginPassword: '',
            successfulLogin: false
        }
    }
    onChangeLoginEmail = (e) => {
        this.setState({
            loginEmail: e.target.value
        });
    }

    onChangeLoginPassword = (e) => {
        this.setState({
            loginPassword: e.target.value
        });
    }

    onSubmit = (e) => {
        const { dispatch } = this.props;
        e.preventDefault();

        const credentials = {
            loginEmail: this.state.loginEmail,
            loginPassword: this.state.loginPassword,
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:5000/login/', credentials)
        .then(res => {
            console.log(res);
            dispatch(loginUser(res.data));
            this.setState({
                successfulLogin: true
            })

            window.location = '/home/'
        }).catch(e => {
            console.log(e);
        });

        this.setState({
            loginEmail: '',
            loginPassword: ''
        })

    }

    render(){
        return(
            <div>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.loginEmail}
                            onChange={this.onChangeLoginEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            id="password"
                            required
                            className="form-control"
                            value={this.state.loginPassword}
                            onChange={this.onChangeLoginPassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    };
}

export default (connect(mapStateToProps)(Login));