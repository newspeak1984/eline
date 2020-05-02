import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { socket } from "../App";

function Home() {
    const [placement, setPlacement] = useState(300);
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState();

    useEffect(() => {
        let mounted = true;

        socket.on("getNext", () => {
            if (mounted) {
                setPlacement(placement - 1);
            }
        });

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

        axios.get('http://localhost:5000/login/verifySession', { withCredentials: true })
            .then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            });

        return () => mounted = false;
    }, [placement])

    function verifyLocation(storeLat, storeLong, fn){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                console.log('User Location: ', latitude, longitude)
                //var latitude = 43.611886;
                //var longitude = -79.692436;
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
        
        let storeLat, storeLong;
        for(let i=0;i<stores.length;i++){
            if(stores[i].name === selectedStore){
                storeLat = parseFloat(stores[i].latitude.$numberDecimal);
                storeLong = parseFloat(stores[i].longitude.$numberDecimal);
            }
        }
        console.log('Store Location: ', storeLat, storeLong)
        verifyLocation(storeLat, storeLong, (result) => {
            console.log('result:' , result);
            if (result) {
                socket.emit('enter', "DATA");
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
    return (
        <div>
            <h1>Welcome to eline!</h1>
            <h2 id="waitTime">{placement}</h2>
            <form onSubmit={onSubmit}>
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
        </div>
    )
}

export default Home;