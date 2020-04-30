import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { verifyAuth } from "../actions";

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(verifyAuth());
    }
    render(){
        return(
            <h1>Home Page</h1>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default (connect(mapStateToProps)(Home));