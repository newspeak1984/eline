import React, { useState, useEffect } from "react";

export default function Base() {

    const onClickNewAccount = () =>{
        window.location = '/createAccount/'
    }

    const onClickLogin = () =>{
        window.location = '/login/'
    }

    return(
        <div>
            <h1>Welcome to eline!</h1>
            <button onClick={onClickNewAccount}>Create New Account</button>
            <br></br>
            <button onClick={onClickLogin}>Login</button>
        </div>            
    )
}
