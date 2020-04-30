import React from "react";
import axios from 'axios';
import socket from "../App";

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/login/verifySession', {withCredentials: true})
        .then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e);
        });
    }
    render(){
        return(
            <h1>Home Page</h1>
        )
    }
}

export default Home;