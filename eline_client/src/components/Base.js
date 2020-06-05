import React, { useState, useEffect } from "react";
import { withTheme } from "@material-ui/core";
import './styles.css';
const logo = require('../graphics/eline.png')

export default function Base() {

    const onClickNewAccount = () =>{
        window.location = '/createAccount/'
    }

    const onClickLogin = () =>{
        window.location = '/login/'
    }

    const styles = {
        "elineLogo": {
            marginTop: '210px ',
            marginBottom: '98px',
            width: '85%'
        }
    }

    return(
        <div style={{textAlign: 'center'}}>            
            <img src={logo} className="elineLogo" style={styles.elineLogo}></img>
            <button onClick={onClickLogin} className="GreenButton">Login</button>
            <br></br>
            <button onClick={onClickNewAccount} className="WhiteButton" style={{marginTop: '22px'}}>Sign Up</button>
        </div>            
    )
}
