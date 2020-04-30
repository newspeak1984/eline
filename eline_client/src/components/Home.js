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

    onEnterLine = () =>{
        console.log('enter line');
        
        //hit endpoint here to enter line
    }

    render(){
        return(
            <div>
                <h1>Welcome to eline!</h1>
                <h2 id="waitTime">NUM</h2>
                <button id="getInLine" onClick={this.onEnterLine}>Enter Line</button>
            </div>
        )
    }
}

const styles = {
    "button": {

    }
}

export default Home;