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
        let mounted = true;

        socket.on("getNext", (data) => {
            if (mounted) {
                console.log('next: ', data.customerId)
                setNextCustomer(data.customerId);
            }
        });

        return () => mounted = false;
    }, [nextCustomer])

    const onGetNext = (e) =>{
        e.preventDefault();
        console.log('get next person');
        socket.emit('getNext', "5ea751cc1f058dbb81573344");
        dispatch(getFromQueue("Costco, Markham", "5ea751cc1f058dbb81573344"))
        // TODO: use state
    }

    return(
        <div>
            <h1>Admin Page</h1>
            <h2 id="nextPerson">Next person: {nextCustomer}</h2>
            <button onClick={onGetNext}>Get Next Person</button>
        </div>
    )   
}
