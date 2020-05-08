import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { connect, useDispatch, shallowEqual, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import { verifyAuth, removeFromQueue, addToQueueRequest, addToQueueSuccess, addToQueueFailure, moveUpInQueue, setInitialPosition, waitForArrival } from "../actions";
import { socket } from "../App";

export default function Home() {
    const dispatch = useDispatch();

    const { user, isAuthenticated, currentStore, currentStoreName, placement, isVerifying, isAddingToQueue, isAllowedIn, email } = useSelector(state => ({
        user: state.auth_customer.user,
        email: state.auth_customer.email,
        isAuthenticated: state.auth_customer.isAuthenticated,
        isVerifying: state.auth_customer.isVerifying,
        currentStore: state.queue_customer.currentStore,
        currentStoreName: state.queue_customer.currentStoreName,
        placement: state.queue_customer.placement,
        isAddingToQueue: state.queue_customer.isAddingToQueue,
        isAllowedIn: state.queue_customer.isAllowedIn
    }), shallowEqual)

    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState();
    const [chosenStore, setChosenStore] = useState('');
    const [inRadius, setInRadius] = useState(true);

    const ref = useRef('userInput');

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
            if (mounted && data.customerId == user && data.storeId == currentStore) {
                // email sender
                // axios.get('http://localhost:5000/home/' + data.customerId)
                // .then(async (res) => {
                //     console.log(res);
                //  })
                // .catch((error) => {
                //     console.log(error);
                // })
                onAllowedIn();
            } else if (mounted && placement > 0) {
                // TODO: check that customer is matching here
                console.log('get next', data, placement);
                // FIXME: maybe try preventing the two requests
                onGetNext();    
            } 
        });

        socket.on('leaveLine', (data) => {
            if (mounted && placement > 0 && data.storeId == currentStore && data.index <= placement){
                console.log('someone left the line')
                onGetNext();
            }
        })
 
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
    }, [placement, isAllowedIn])

    const onEnterLine = (storeId) => {
        socket.emit('enter', {
            customerId: user,
            storeId: storeId
        });
    }

    const onGetNext = () => {
        console.log('current placement', placement); 
        dispatch(moveUpInQueue())
    }

    const onRemoveFromQueue = () => {
        let confirmation = window.confirm(`Are you at the entrance of ${currentStoreName}? \nIf you click "ok" and do not arrive in time, you may lose your place in line.`)

        if(confirmation) {
            dispatch(removeFromQueue())
            socket.emit('customerArrived', {customerId: user, email: email, storeId: currentStore});        
        }
    }

    const onAllowedIn = () => {
        console.log('onAllowedIn')
        dispatch(waitForArrival());
    }

    function verifyLocation(storeLat, storeLong, fn){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                //let latitude = position.coords.latitude;
                //let longitude = position.coords.longitude;

                let latitude = 43.846085;
                let longitude = -79.353386;

                console.log('User Location: ', latitude, longitude)
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

    const onSubmit = () => {
        // e.preventDefault();

        dispatch(addToQueueRequest());
        
        let storeLat, storeLong, storeId, storeName;
        for(let i=0;i<stores.length;i++){
            if(stores[i].name === selectedStore){
                storeLat = parseFloat(stores[i].latitude.$numberDecimal);
                storeLong = parseFloat(stores[i].longitude.$numberDecimal);
                storeName = stores[i].name;
                storeId = stores[i]._id;
            }
        }
        console.log('Store Location: ', storeLat, storeLong)
        verifyLocation(storeLat, storeLong, (result) => {
            console.log('result:' , result);
            if (result) {
                onEnterLine(storeId);
                dispatch(addToQueueSuccess(storeId, storeName))
                setInRadius(true);
            }
            else{
                dispatch(addToQueueFailure());
                console.log('NOT IN RADIUS');
                setChosenStore(selectedStore);
                setInRadius(false);
            }
        });        
    }

    const onSelectStore = (e) => {
        setSelectedStore(e.target.value);
    }

    const onLeaveLine = () => {
        let leaveLine = window.confirm(`Are you sure you want to leave ${currentStoreName}'s line? \nClick "ok" to leave or "cancel" to remain.`)
        if(leaveLine){
            dispatch(removeFromQueue());
            socket.emit('leaveLine', {customerId: user, storeId: currentStore, index: placement, isAllowedIn: isAllowedIn})
        }
    }

    const onViewProfile = () =>{
        window.location = '/profile';
    }
     
    return (<div>
        <h1>Welcome to eline {email}!</h1>
        { isVerifying 
            ? <h2>Loading</h2> 
            : (isAuthenticated) ? (
                <div>
                    <button onClick={onViewProfile} style={styles.profileButton}>View My Profile</button>
                    {
                        isAddingToQueue
                            ? <h2>Adding you to {selectedStore}'s line</h2>
                            : <div> {
                                currentStore
                                    ? isAllowedIn
                                        ? (<div>
                                            <h2>{email} please proceed to the store and click the button once you are there. Show your profile page to the worker at the door to be allowed in</h2>
                                            <Button onClick={onRemoveFromQueue} variant="outlined">I'm here!</Button>
                                            <Button onClick={onLeaveLine} variant="outlined">Leave Line</Button>
                                           </div>)
                                        :(<div>
                                            <h2 id="waitTime">Your position in {currentStoreName}'s line: {placement + 1}</h2>
                                            <Button onClick={onLeaveLine} variant="outlined">Leave Line</Button>
                                        </div>)
                                        : <form>
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
                                                {/* <input type="submit" value="Enter Line" className="btn btn-primary" /> */}
                                                <Button onClick={onSubmit} variant="outlined">Enter Line</Button>
                                            </div>
                                            {
                                                inRadius
                                                    ? ''
                                                    : <h3>You are outside of {chosenStore}'s 500m radius</h3>
                                            }
                                        </form>
                                } </div>
                        }
                    </div>
                ) : <div><h4>You are not logged in yet</h4></div>
        }
    </div>)
}

const styles = {
    "profileButton": {
        float: 'right'
    }
}
