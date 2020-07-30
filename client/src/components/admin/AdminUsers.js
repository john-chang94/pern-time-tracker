import React, { Component } from 'react'
import { connect } from 'react-redux';
// import axios from 'axios';
import RegisterUser from './RegisterUser';
import UsersList from './UsersList';
import { getAllUsers } from '../../actions/adminActions';

class AdminUsers extends Component {
    componentDidMount() {
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
        users: state.admin.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(getAllUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);