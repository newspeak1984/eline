import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector, shallowEqual } from "react-redux";
import { socket } from "../App";
import { verifyAuth, getFromQueue } from "../actions";

export default function Admin() {
    const dispatch = useDispatch();

    const { enteredLine } = useSelector(state => ({
        enteredLine: state.queue_admin.enteredLine
        // TODO check for admin login
    }), shallowEqual)

    const [nextCustomer, setNextCustomer] = useState("");

    useEffect(() => {
        socket.on("getNext", (customer) => {
            setNextCustomer(customer);
        });

    }, [nextCustomer])

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
