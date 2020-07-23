import React from 'react'

const UsersList = ({ users }) => {
    return (
        <div>
            <table>
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
                            <tr key={index}>
                                <td>{user.last_name}, {user.first_name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.is_admin ? 'Y' : 'N'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UsersList;