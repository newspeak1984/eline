import React, { useState, useEffect, useRef } from "react";
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

    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState();

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

        axios.get('http://localhost:5000/store/')
            .then(response => {
                if (response.data.length > 0) {
                    setStores(response.data.map(store => store))
                    setSelectedStore(response.data[0].name)
                }                
            })
            .catch((error) => {
                console.log(error);
            })

        return () => mounted = false;
    }, [placement])

    const onEnterLine = (storeId) => {
        console.log('enter line');
        console.log(`entering`, user)
        socket.emit('enter', {
            customerId: user,
            storeId: storeId
        });
        dispatch(addToQueue(storeId))
        // TODO: send customer and store info
        // need to send dispatch?
    }

    const onGetNext = () => {
        console.log('current placement', placement);

        dispatch(moveUpInQueue())
    }

    const onRemoveFromQueue = () => {
        dispatch(removeFromQueue())
    }

    // return isAuthenticated ? (
    //     <div>
    //         <h1>Welcome to eline!</h1>
    //         {
    //             currentStore 
    //                 ? (<h2 id="waitTime">Your position in {currentStore}'s line: {(placement % 1 === 0) ? placement : placement - 0.5}</h2> )
    //                 : <button id="getInLine" onClick={onEnterLine}>Enter Line</button>
    //         }


    function verifyLocation(storeLat, storeLong, fn){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                //var latitude = position.coords.latitude;
                //var longitude = position.coords.longitude;
                console.log('User Location: ', latitude, longitude)
                var latitude = 43.846085;
                var longitude = -79.353386;
                let distance = getDistance(latitude, longitude, storeLat, storeLong);
                console.log('Distance: ', distance);
                if(distance >= 0 && distance <= 400){
                    fn(true);
                }else {
                    fn(false);
                }          

            },
                function error(msg) {
                    alert('Please enable your GPS position feature.');
                    fn(false);
                },
                { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
        } else {
            alert("Geolocation API is not supported in your browser.");
            fn(false);
        }
    }

    function getDistance(lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
      
        return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
      }

    const onSubmit = (e) => {
        e.preventDefault();
        
        let storeLat, storeLong, storeId;
        for(let i=0;i<stores.length;i++){
            if(stores[i].name === selectedStore){
                storeLat = parseFloat(stores[i].latitude.$numberDecimal);
                storeLong = parseFloat(stores[i].longitude.$numberDecimal);
                storeId = stores[i]._id;
            }
        }
        console.log('Store Location: ', storeLat, storeLong)
        verifyLocation(storeLat, storeLong, (result) => {
            console.log('result:' , result);
            if (result) {
                onEnterLine(storeId);
                // TODO: send customer and store info
            }
            else{
                console.log('NOT IN RADIUS');
                // handle UI when not in radius
            }
        });        
    }

    const onSelectStore = (e) => {
        setSelectedStore(e.target.value);
    }

    const ref = useRef('userInput');
    return isAuthenticated ?(
        <div>
            <h1>Welcome to eline!</h1>
            {
                currentStore 
                    ? (<h2 id="waitTime">Your position in {currentStore}'s line: {(placement % 1 === 0) ? placement : placement - 0.5}</h2> )
                    : <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Store: </label>
                            <select ref={ref}
                                required
                                className="form-control"
                                value={selectedStore}
                                onChange={onSelectStore}>
                                {
                                    stores.map(function (store) {
                                        return <option
                                            key={store.name}
                                            value={store.name}>{store.name}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Enter Line" className="btn btn-primary" />
                        </div>
                    </form>
            }
        </div>
    ) : <div>
        <h4>You are not logged in yet</h4>
    </div>
}
