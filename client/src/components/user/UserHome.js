import React from 'react'
import { connect } from 'react-redux';
import NewEntry from './NewEntry';
import EntriesList from './EntriesList';

const UserHome = () => {
    return (
        <div className="row">
            <div className="col m5 s12">
                <NewEntry />
            </div>
            <div className="col m6 s12 offset-m1">
                <EntriesList />
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(UserHome);