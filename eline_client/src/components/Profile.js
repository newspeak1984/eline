import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from 'axios';
import './styles.css';
import { config } from '../Constants';
import { socket } from "../App";
import { removeFromQueue } from "../actions"

const logo = require('../graphics/eline.png')
const baseDesign = require('../graphics/myhumps.png')

export default function Profile() {
    const dispatch = useDispatch();

    const [status, setStatus] = useState(false);
    const [profile, setProfile] = useState();
    const { user, email, currentStore } = useSelector(state => ({
        user: state.auth_customer.user,
        email: state.auth_customer.email,
        currentStore: state.queue_customer.currentStore
    }), shallowEqual);

    useEffect(() => {
        axios.get(config.url.API_URL + '/profile/' + user)
            .then(async (res) => {
                if(!status){
                    setProfile(res.data);
                    setStatus(true);
                }                
            })
            .catch((error) => {
            })
    },[]);

    useEffect(() => {
        let mounted = true;

        socket.on('removeCustomer', (data) => {
            if (mounted && currentStore && data === email) {
                dispatch(removeFromQueue());
            }
        })

        return () => mounted = false;
    })

    const styles = {
        "elineLogo": {
            marginTop: '75px',
            marginBottom: '63px',
            width: '60%'
        }
    }

    return (
        <div>
            <a href={config.url.ELINE_URL + "/home"}>
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