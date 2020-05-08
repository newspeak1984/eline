import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import openSocket from 'socket.io-client';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar"
import Base from "./components/Base";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";
import AdminCreateAccount from "./components/AdminCreateAccount";
import Profile from "./components/Profile"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from  "./components/ResetPassword"

export const socket = openSocket('http://localhost:5000');

class App extends React.Component {
  constructor(){
    super();
  }
  
  render(){
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br/>
          <Route path="/" exact component={Base} />
          <Route path="/home" component={Home} />
          <Route path="/createAccount" component={CreateAccount} />
          <Route path="/login" exact component={Login} />
          <Route path="/login/forgotPassword" component={ForgotPassword} />
          <Route path="/login/resetPassword" component={ResetPassword} />
          <Route path="/profile" component={Profile} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/createAccount" component={AdminCreateAccount} />
        </div>
      </Router>      
    );
  }  
}

export default App;
