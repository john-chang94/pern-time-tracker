import React from 'react'
import { connect } from 'react-redux';
import NewEntry from './NewEntry';

const UserHome = () => {
    return ( 
        <div className="row">
            <NewEntry />
        </div>
     );
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
 
export default connect(mapStateToProps)(UserHome);