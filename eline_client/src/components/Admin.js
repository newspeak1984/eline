import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { socket } from "../App";
import { verifyAdminAuth, getFromQueue, addToArrviedList, removeEnteringCustomer, removeArrivingCustomer } from "../actions";
import { Button } from "@material-ui/core";
const logo = require('../graphics/eline.png')
const baseDesign = require('../graphics/myhumps.png')

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
                    setCalledCustomersLocal(calledCustomersLocal+1);
                    dispatch(getFromQueue(data.customerId))
                } else {
                    alert("The line is currently empty")
                }
            }
        });

        socket.on('customerArrived', (data) => {
            if (mounted && data.storeId == storeId){

                dispatch(addToArrviedList(data.email))
                setForceRender(arrivingCustomers[arrivingCustomers.length-1])
            }
        })

        socket.on('leaveLine', (data) => {
            if (mounted && data.storeId == storeId && data.isAllowedIn){
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

    const styles = {
        "elineLogo": {
            marginTop: '26px',
            marginBottom: '10px',
            width: '50%'
        },
        "storeText":{
            textAlign: 'center',
            fontFamily: 'Helvetica',
            fontSize: '31px',
            lineHeight: '42px',
            marginTop: '30px',
            color: '#009F66',
            marginBottom: '22px'
        },
        "divider": {
            border: '1px solid #A9A9A9',
            width: '65%',
            height: '0px',
            margin: 'auto'
        },
        "customersText": {
            fontSize: '18px',
            color: '#4F4F4F',
            lineHeight: '21px',
            fontFamily: 'Helvetica',
            marginTop: '20px',
            marginBottom: '-15px'
        },
        "calledCustomers": {
            fontSize: '144px',
            lineHeight: '169px',
            color: '#009F66'
        }
    }

    return(
        <div style={{"textAlign": 'center'}}>
            <img src={logo} class="elineLogo" style={styles.elineLogo}></img>
            {
                isVerifying
                    ? <h4>Loading</h4>
                    : ( isAdminAuthenticated 
                        ? <div>
                            <p style={styles.storeText}>{storeName} Admin</p>
                            <div style={styles.divider}></div>
                            <p style={styles.customersText}>Number of customers called:</p>
                            <p style={styles.calledCustomers}>{calledCustomers}</p>
                            <Button onClick={onGetNext} variant="contained" class="GreenButton" style={{"width": '245px', "marginBottom": '22px'}}>Call Next Customer</Button>
                            <div style={styles.divider}></div>                            
                            <p style={{"fontSize": '20px',"marginTop": '10px',"marginBottom": '-10px'}}>Arriving customers:</p>
                            <p style={styles.customersText}>Click to admit customer into your store</p>
                            <br></br>
                            {arrivingCustomers.map((customer, index) => (
                                <Button onClick={() => {onAdmitCustomer(index, customer)}} 
                                variant='outlined' key={index} style={{"borderRadius": '20px'}}>{customer}</Button>
                            ))}
                        </div>
                        : <h2>You are not logged in as an admin</h2>
                    )
            }
            <img src={baseDesign} class="fixBottom"></img>
        </div>
    )   
}
