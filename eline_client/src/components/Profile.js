import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from 'axios';
import './styles.css';
const logo = require('../graphics/eline.png')
const baseDesign = require('../graphics/myhumps.png')

export default function Profile() {
    const [status, setStatus] = useState(false);
    const [profile, setProfile] = useState();
    const { user } = useSelector(state => ({
        user: state.auth_customer.user
    }), shallowEqual);

    useEffect(() => {
        axios.get('http://localhost:5000/profile/' + user)
            .then(async (res) => {
                if(!status){
                    setProfile(res.data);
                    setStatus(true);
                }                
            })
            .catch((error) => {
                console.log(error);
            })
    },[]);

    const styles = {
        "elineLogo": {
            marginTop: '75px',
            marginBottom: '63px',
            width: '60%'
        }
    }

    return (
        <div>
            <a href="http://localhost:3000/home">
                    <img src={logo} class="elineLogo" style={styles.elineLogo}></img>
            </a>
            <h1>Your Profile</h1>
            <p>Email: {status ? profile.email : ''}</p>
            <p>Username: {status ? profile.username : ''}</p>
            <p>Phone Number: {status ? profile.phone : ''}</p>    
            <img src={baseDesign} class="fixBottom"></img>            
        </div>
    )
}