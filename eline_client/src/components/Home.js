import React, { useState, useEffect } from "react";
import axios from 'axios';
import { connect, useDispatch, shallowEqual, useSelector } from "react-redux";
import { verifyAuth, removeFromQueue, addToQueue, moveUpInQueue, setInitialPosition } from "../actions";
import { socket } from "../App";

export default function Home() {
    const dispatch = useDispatch();

    const { user, isAuthenticated, currentStore, placement } = useSelector(state => ({
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        currentStore: state.queue_customer.currentStore,
        placement: state.queue_customer.placement,
        inQueue: state.queue_customer.inQueue
    }), shallowEqual)

    // const place = placement.toFix(1);

    useEffect(() => {
        let mounted = true;

        socket.on('initialPosition', (data) => {
            console.log('intial position', mounted, data);
            if (mounted && data.customerId === user) {
                console.log(data.index);
                dispatch(setInitialPosition(data.index))
            }
        })

        socket.on('getNext', (data) => {
            // data is {customerId, storeId}
            if (mounted && placement > 0) {
                // TODO: check that customer is matching here
                console.log('get next', data, placement);
                // FIXME: maybe try preventing the two requests
                onGetNext();    
            } else if (mounted && data.customerId === user && data.storeId === currentStore) {
                console.log(`REMOVING ${user} from ${data.storeId}`);
                onRemoveFromQueue();
            }
        });
 
        dispatch(verifyAuth());

        return () => mounted = false;
    }, [placement])

    const onEnterLine = () => {
        console.log('enter line');
        console.log(`entering`, user)
        socket.emit('enter', {
            customerId: user,
            storeId: "5ea751cc1f058dbb81573344"
        });
        dispatch(addToQueue("5ea751cc1f058dbb81573344"))
        // TODO: send customer and store info
        // need to send dispatch?
    }

    // FIXME: this is read like 4 times
    // socket.on('initialPosition', (data) => {
    //     console.log('intial position', data);
    //     if (data.customerId === user) {
    //         dispatch(setInitialPosition(data.index))
    //     }
    // })

    const onGetNext = () => {
        console.log('current placement', placement);

        dispatch(moveUpInQueue())
    }

    const onRemoveFromQueue = () => {
        dispatch(removeFromQueue())
    }

    return isAuthenticated ? (
        <div>
            <h1>Welcome to eline!</h1>
            {
                currentStore 
                    ? (<h2 id="waitTime">Your position in {currentStore}'s line: {(placement % 1 === 0) ? placement : placement - 0.5}</h2> )
                    : <button id="getInLine" onClick={onEnterLine}>Enter Line</button>
            }
        </div>
    ) : <div>
        <h4>You are not logged in yet</h4>
    </div>
}
