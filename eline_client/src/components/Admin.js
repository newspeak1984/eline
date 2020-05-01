import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { socket } from "../App";
import { getFromQueue } from "../actions";

function Admin() {
    const dispatch = useDispatch();

    const [nextCustomer, setNextCustomer] = useState("");

    useEffect(() => {
        socket.on("getNext", (customer) => {
            setNextCustomer(customer);
        });
    })

    const onGetNext = () =>{
        console.log('get next person');
        socket.emit('getNext', "CUSTOMER");
        dispatch(getFromQueue("Costco, Markham", "5ea73939eb0c882ba06bdad5"))
        // TODO: send customer and store
    }

    return(
        <div>
            <h1>Admin Page</h1>
            <h2 id="nextPerson">Next person: {nextCustomer}</h2>
            <button onClick={onGetNext}>Get Next Person</button>
        </div>
    )   
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default (connect(mapStateToProps)(Admin));