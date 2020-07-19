import React from 'react'
import { connect } from 'react-redux';
import NewEntry from './NewEntry';
import EntriesList from './EntriesList';
import axios from 'axios';
import moment from 'moment';
import { getProjects, getEntries } from '../../actions/userActions';

const UserHome = ({ token, user, getProjects, getEntries }) => {
    if (token) {
        // Set global headers for axios once token is in store
        const tokenConfig = { 'token': token }
        axios.defaults.headers = tokenConfig
    }
    if (user) {
        getProjects(user.user_id)
        getEntries(
            user.user_id,
            moment(new Date(Date.now())).day(1).format('yyyy-MM-DD'), // Monday of current week
            moment(new Date(Date.now())).day(5).format('yyyy-MM-DD') // Friday of current week
        )
    }
    return (
        <div>
            <div className="row">
                <div className="col m12">
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

const mapDispatchToProps = dispatch => {
    return {
        getProjects: user_id => dispatch(getProjects(user_id)),
        getEntries: (user_id, week_start, week_end) => dispatch(getEntries(user_id, week_start, week_end))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);