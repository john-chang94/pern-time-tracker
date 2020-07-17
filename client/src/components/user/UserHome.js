import React from 'react'
import { connect } from 'react-redux';
import NewEntry from './NewEntry';
import EntriesList from './EntriesList';
import axios from 'axios';
import { getProjects, getEntries } from '../../actions/userActions';
import NewTimesheet from './NewTimesheet';

const UserHome = ({ token, user, getProjects, getEntries }) => {
    if (token) {
        // Set global headers for axios once token is in store
        const tokenConfig = { 'token': token }
        axios.defaults.headers = tokenConfig
    }
    if (user) {
        getProjects(user.user_id)
        getEntries(user.user_id)
    }
    return (
        <div>
            <div className="row">
                <div className="col m6 s12">
                    <NewEntry />
                </div>
                <div className="col m6 s12">
                    <NewTimesheet />
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

const mapDispatchToProps = dispatch => {
    return {
        getProjects: user_id => dispatch(getProjects(user_id)),
        getEntries: user_id => dispatch(getEntries(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);