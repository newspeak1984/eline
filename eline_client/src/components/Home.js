import React, { useState, useEffect } from "react";
import axios from 'axios';
import { connect, useDispatch, shallowEqual, useSelector } from "react-redux";
import { verifyAuth } from "../actions";
import { socket } from "../App";

function Home() {
    const dispatch = useDispatch();

    const [placement, setPlacement] = useState(300);
    // FIXME: fix to read the placement from the store

    useEffect(() => {
        let mounted = true;

        socket.on("getNext", () => {
            if (mounted) {
                console.log('get next');
                setPlacement(placement - 0.5);
            }
        });

        // why is this recieved twice
        
        dispatch(verifyAuth());

        return () => mounted = false;
    })

    const onEnterLine = () => {
        console.log('enter line');
        socket.emit('enter', "DATA");
        // TODO: send customer and store info
    }

    const onGetNext = () => {
        // dispatches removeFromQueue if it matches the right user
    }

    return (
        <div>
            <h1>Welcome to eline!</h1>
            <h2 id="waitTime">Your position in line: {placement}</h2>
            <button id="getInLine" onClick={onEnterLine}>Enter Line</button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default (connect(mapStateToProps)(Home));