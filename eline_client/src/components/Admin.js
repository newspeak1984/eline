import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { socket } from "../App";
import { verifyAdminAuth, getFromQueue } from "../actions";

export default function Admin() {
    const dispatch = useDispatch();

    const { enteredCustomer, isAdminAuthenticated, isVerifying, adminId, storeId } = useSelector(state => ({
        enteredCustomer: state.queue_admin.enteredCustomer,
        isVerifying: state.auth_admin.isVerifying,
        isAdminAuthenticated: state.auth_admin.isAdminAuthenticated,
        adminId: state.auth_admin.adminId,
        storeId: state.auth_admin.storeId,
    }), shallowEqual)

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

        dispatch(verifyAdminAuth());

        return () => mounted = false;
    }, [enteredCustomer])

    const onGetNext = (e) =>{
        e.preventDefault();
        console.log('get next person');
        socket.emit('getNext', storeId);
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
                        </div>
                        : <h2>You are not logged in as an admin</h2>
                    )
            }
        </div>
    )   
}
