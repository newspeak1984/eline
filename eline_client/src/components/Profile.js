import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from 'axios';

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


    return (
        <div>
            <h1>Your Profile</h1>
                <p>Email: {status ? profile.email : ''}</p>
                <p>Username: {status ? profile.username : ''}</p>
                <p>Phone Number: {status ? profile.phone : ''}</p>                
        </div>
    )
}