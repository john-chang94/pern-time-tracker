import React from 'react'
import { connect } from 'react-redux';
import NewEntry from './NewEntry';
import EntriesList from './EntriesList';
import axios from 'axios';

const UserHome = ({ token }) => {
    if (token) {
        // Set global headers for axios once token is in store
        const tokenConfig = { 'token': token }
        axios.defaults.headers = tokenConfig
    }
    return (
        <div>
            <div className="row">
                <div className="col m6 s12">
                    <NewEntry />
                </div>
            </div>
            <div className="row">
                <div className="col m12">
                    <EntriesList />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(UserHome);