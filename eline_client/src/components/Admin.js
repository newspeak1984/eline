import React from "react";

class Admin extends React.Component{
    constructor(){
        super();
    }

    onGetNext = () =>{
        console.log('get next person');
        //hit endpoint here to retrieve next customer
    }

    render(){
        return(
            <div>
                <h1>Admin Page</h1>
                <h2 id="nextPerson">next</h2>
                <button onClick={this.onGetNext}>Get Next Person</button>
            </div>
            
        )
    }
}

export default Admin;