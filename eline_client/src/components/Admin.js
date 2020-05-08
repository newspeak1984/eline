import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { socket } from "../App";
import { verifyAdminAuth, getFromQueue, addToArrviedList, removeEnteringCustomer, removeArrivingCustomer } from "../actions";
import { Button } from "@material-ui/core";

export default function Admin() {
    const dispatch = useDispatch();

    const { arrivingCustomer, isAdminAuthenticated, isVerifying, storeId, arrivingCustomers, calledCustomers, storeName } = useSelector(state => ({
        arrivingCustomer: state.queue_admin.arrivingCustomer,
        isVerifying: state.auth_admin.isVerifying,
        isAdminAuthenticated: state.auth_admin.isAdminAuthenticated,
        storeId: state.auth_admin.storeId,
        storeName: state.auth_admin.storeName,
        arrivingCustomers: state.queue_admin.arrivingCustomers,
        calledCustomers: state.queue_admin.calledCustomers,
    }), shallowEqual)

    const [forceRender, setForceRender] = useState('true');
    const [calledCustomersLocal, setCalledCustomersLocal] = useState(0);

    useEffect(() => {
        let mounted = true;

        socket.on("getNext", (data) => {
            if (mounted){
                if (data.customerId){
                    console.log('next: ', data.customerId)
                    setCalledCustomersLocal(calledCustomersLocal+1);
                    // FIXME: didn't work all the time
                    dispatch(getFromQueue(data.customerId))
                } else {
                    console.log("Line is empty")
                    alert("The line is currently empty")
                }
            }
        });

        socket.on('customerArrived', (data) => {
            if (mounted && data.storeId == storeId){
                console.log("customer arrived", data, forceRender);

                dispatch(addToArrviedList(data.email))
                // TODO: investigate this flip flop that doesn't change it in the end
                setForceRender(arrivingCustomers[arrivingCustomers.length-1])
                console.log(forceRender)
            }
        })

        socket.on('leaveLine', (data) => {
            if (mounted && data.storeId == storeId && data.isAllowedIn){
                console.log('allowed customer left line')
                dispatch(removeArrivingCustomer());
            }
        })

        dispatch(verifyAdminAuth());

        return () => mounted = false;
    }, [arrivingCustomer, arrivingCustomers])

    const onGetNext = (e) =>{
        e.preventDefault();
        let getNext = true;
        if (arrivingCustomers.length == 10) {
            getNext = window.confirm('Would you like to call another customer and remove the longest arriving customer without admitting them?')
        }
        if (getNext) {
            socket.emit('getNext', storeId);
        }
    }

    let onAdmitCustomer = (index, customer) => {
        let enter = window.confirm(`Remove ${customer} from line? \nPlease do so if they have entered.`)
        if (enter) {
            dispatch(removeEnteringCustomer(index))
            setForceRender(arrivingCustomers[index])
            setCalledCustomersLocal(calledCustomersLocal-1);
        }
    } 

    return(
        <div>
            {
                isVerifying
                    ? <h4>Loading</h4>
                    : ( isAdminAuthenticated 
                        ? <div>
                            <h1>{storeName}: Admin Page</h1>
                            {/* write store name somewhere */}
                            <h2 id="calledCustomers">Number of customers called: {calledCustomers}</h2>
                            <Button onClick={onGetNext} variant="contained" color='primary'>Call Next Customer</Button>
                            <h3>Arriving customers:</h3>
                            <p>Click to admit customer into your store</p>
                            {arrivingCustomers.map((customer, index) => (
                                // somehow need to click button to remove them from the list
                                <Button onClick={() => {onAdmitCustomer(index, customer)}} variant='outlined' key={index}>{customer}</Button>
                            ))}
                        </div>
                        : <h2>You are not logged in as an admin</h2>
                    )
            }
        </div>
    )   
}
