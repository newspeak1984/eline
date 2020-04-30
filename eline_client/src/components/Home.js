import React, { useState, useEffect } from "react";
import axios from 'axios';
import { socket } from "../App";

function Home() {
    const [placement, setPlacement] = useState(300);

    useEffect(() => {
        socket.on("getNext", () => {
            setPlacement(placement - 1);
        });
        
        axios.get('http://localhost:5000/login/verifySession', {withCredentials: true})
            .then(res => {
            console.log(res);
            }).catch(e => {
            console.log(e);
            });
    })

    const onEnterLine = () =>{
        console.log('enter line');
        socket.emit('enter', "DATA");
        // TODO: send customer and store info
    }

    return (
        <div>
            <h1>Welcome to eline!</h1>
            <h2 id="waitTime">NUM</h2>
            <button id="getInLine" onClick={onEnterLine}>Enter Line</button>
        </div>
    )
}

export default Home;