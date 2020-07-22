import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import RegisterUser from './RegisterUser';

const AdminUsers = ({ token }) => {
    if (token) {
        // Set global headers for axios once token is in store
        const tokenConfig = { 'token': token }
        axios.defaults.headers = tokenConfig
    }

    return (
        <div>
            <RegisterUser />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(AdminUsers);