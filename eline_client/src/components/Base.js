import React from "react";

class Base extends React.Component{
    constructor(){
        super();
    }

    onClickNewAccount = () =>{
        window.location = '/createAccount/'
    }

    onClickLogin = () =>{
        window.location = '/login/'
    }

    render(){
        return(
            <div>
                <h1>Welcome to eline!</h1>
                <button onClick={this.onClickNewAccount}>Create New Account</button>
                <br></br>
                <button onClick={this.onClickLogin}>Login</button>
            </div>            
        )
    }
}

export default Base;