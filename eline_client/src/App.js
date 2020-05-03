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
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
        </div>
      </Router>      
    );
  }  
}

export default App;
