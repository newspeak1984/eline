import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from 'axios';
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
                dispatch(getFromQueue("5eac76442a7020291c92e62f", data.customerId))
            }
        });

        //TODO: dispatch this
        axios.get('http://localhost:5000/admin/verifySession', { withCredentials: true })
            .then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            });

        return () => mounted = false;
    }, [nextCustomer])

    const onGetNext = (e) =>{
        e.preventDefault();
        console.log('get next person');
        socket.emit('getNext', "5eac76442a7020291c92e62f");
        // TODO
    }

    return(
        <div>
            <h1>Admin Page</h1>
            <h2 id="nextPerson">Next person: {nextCustomer}</h2>
            <button onClick={onGetNext}>Get Next Person</button>
        </div>
    )   
}
