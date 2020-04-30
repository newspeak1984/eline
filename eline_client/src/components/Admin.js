import React, { useState, useEffect } from "react";
import { socket } from "../App";

function Admin() {
    const [nextCustomer, setNextCustomer] = useState("");

    useEffect(() => {
        socket.on("getNext", (customer) => {
            setNextCustomer(customer);
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