import React, { Component } from 'react'
import { connect } from 'react-redux';
// import axios from 'axios';
import RegisterUser from './RegisterUser';
import UsersList from './UsersList';
import { getAllUsers } from '../../actions/adminActions';

class AdminUsers extends Component {
    componentDidMount() {
        // const { token } = this.props;
        // if (token) {
        //     // Set global headers for axios once token is in store
        //     const tokenConfig = { 'token': token }
        //     axios.defaults.headers = tokenConfig
        // }
        this.props.getAllUsers();
    }

    render() {
        const { users } = this.props;
        return (
            <div>
                <RegisterUser />
                <UsersList users={users} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        users: state.admin.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(getAllUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);