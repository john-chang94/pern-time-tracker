import React, { Component } from 'react'
import EditUser from './EditUser';

class UsersList extends Component {
    state = {
        modalOpen: false,
        user: ''
    }

    openModal = (user) => {
        this.setState({
            modalOpen: true,
            user
        })
    }

    closeModal = () => {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        const { users } = this.props;
        const { modalOpen, user } = this.state;
        return (
            <div style={{ marginBottom: '30px' }}>
                <table className="highlight">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map((user, index) => (
                                <tr key={index} style={{ cursor: 'pointer' }} onClick={this.openModal.bind(this, user)}>
                                    <td>{user.last_name}, {user.first_name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.is_admin ? 'Y' : 'N'}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            <EditUser
                modalOpen={modalOpen}
                closeModal={this.closeModal}
                user={user}
            />
            </div>
        )
    }
}

export default UsersList;