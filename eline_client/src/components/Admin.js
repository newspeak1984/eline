import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { socket } from "../App";
import { verifyAdminAuth, getFromQueue, addToArrviedList, removedEnteredCustomer } from "../actions";
import { Button } from "@material-ui/core";

export default function Admin() {
    const dispatch = useDispatch();

    const { enteredCustomer, isAdminAuthenticated, isVerifying, adminId, storeId, enteredCustomers } = useSelector(state => ({
        enteredCustomer: state.queue_admin.enteredCustomer,
        isVerifying: state.auth_admin.isVerifying,
        isAdminAuthenticated: state.auth_admin.isAdminAuthenticated,
        adminId: state.auth_admin.adminId,
        storeId: state.auth_admin.storeId,
        enteredCustomers: state.queue_admin.enteredCustomers
    }), shallowEqual)

    const [forceRender, setForceRender] = useState(true);

    useEffect(() => {
        let mounted = true;

        socket.on("getNext", (data) => {
            if (mounted){
                if (data.customerId){
                    console.log('next: ', data.customerId)
                    dispatch(getFromQueue(data.customerId))
                } else {
                    console.log("Line is empty")
                    alert("The line is currently empty")
                }
            }
        });

        socket.on('customerArrived', (data) => {
            console.log("customer arrived", data);
            if (mounted && data.storeId == storeId){
                dispatch(addToArrviedList(data.customerId))
                // this is to make the page rerender
                setForceRender(!forceRender)
            }
        })

        dispatch(verifyAdminAuth());

        return () => mounted = false;
    }, [enteredCustomer, enteredCustomers])

    const onGetNext = (e) =>{
        e.preventDefault();
        console.log('get next person');
        socket.emit('getNext', storeId);
    }

    const onAdmitCustomer = (index) => {
        console.log('onadmit', index);
        dispatch(removedEnteredCustomer(index))
        setForceRender(!forceRender)
    } 

    return(
        <div>
            <h1>Admin Page</h1>
            {
                isVerifying
                    ? <h4>Loading</h4>
                    : ( isAdminAuthenticated 
                        ? <div>
                            <h1>StoreId {storeId}</h1>
                            {/* write store name somewhere */}
                            <h2 id="nextPerson">Next person: {enteredCustomer}</h2>
                            <button onClick={onGetNext}>Get Next Person</button>
                            <h3>Called customers:</h3>
                            <p>Click to admit customer into your store</p>
                            {enteredCustomers.map((customer, index) => (
                                // somehow need to click button to remove them from the list
                                <Button onClick={() => {onAdmitCustomer(index)}} variant='outlined' key={index}>{customer}</Button>
                            ))}
                        </div>
                        : <h2>You are not logged in as an admin</h2>
                    )
            }
        </div>
    )   
}
