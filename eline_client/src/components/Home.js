import React, { useState, useEffect } from "react";
import axios from 'axios';
import { connect, useDispatch, shallowEqual, useSelector } from "react-redux";
import { verifyAuth } from "../actions";
import { socket } from "../App";

export default function Home() {
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(state => ({
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }), shallowEqual)

    const [placement, setPlacement] = useState(300);
    // FIXME: fix to read the placement from the store

    useEffect(() => {
        let mounted = true;

        socket.on("getNext", () => {
            if (mounted) {
                console.log('get next');
                setPlacement(placement - 0.5);
                // FIXME: maybe try preventing the two requests
            }
        });
 
        dispatch(verifyAuth());

        return () => mounted = false;
    }, [placement])

    const onEnterLine = () => {
        console.log('enter line');
        socket.emit('enter', "DATA");
        // TODO: send customer and store info
        // need to send dispatch?
    }

    const onGetNext = () => {
        // dispatches removeFromQueue if it matches the right user
    }

    return isAuthenticated ? (
        <div>
            <h1>Welcome to eline!</h1>
            <h2 id="waitTime">Your position in line: {placement}</h2>
            <button id="getInLine" onClick={onEnterLine}>Enter Line</button>
        </div>
    ) : <div>
        <h4>You are not logged in yet</h4>
    </div>
}
