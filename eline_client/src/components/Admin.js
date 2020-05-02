import React, { useState, useEffect } from "react";
import axios from 'axios';
import { socket } from "../App";

function Admin() {
    const [nextCustomer, setNextCustomer] = useState("");

    useEffect(() => {
        socket.on("getNext", (customer) => {
            setNextCustomer(customer);
        });

        axios.get('http://localhost:5000/admin/verifySession', { withCredentials: true })
            .then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            });
    })

    const onGetNext = () =>{
        console.log('get next person');
        socket.emit('getNext', "CUSTOMER");
        // TODO: send customer and store
    }

    return(
        <div>
            <h1>Admin Page</h1>
            <h2 id="nextPerson">next</h2>
            <button onClick={onGetNext}>Get Next Person</button>
        </div>
    )   
}

export default Admin;