import React, { Component } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { updateUser, getAllUsers, updateUserPassword } from '../../actions/adminActions'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px'
    }
};

class EditUser extends Component {
    state = {
        is_admin: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        editPassword: false,
        showPassword: false,
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    }

    // Set values from props into modal state so they != null in values upon modal open
    // Visually, the values are set in the forms by defaultValue
    setValues = () => {
        const { user } = this.props;
        this.setState({
            is_admin: user.is_admin,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email
        })
    }

    handleChange = e => {
        if (e.target.id === 'is_admin') {
            this.setState({
                is_admin: e.target.checked
            })
        } else {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { user, updateUser, getAllUsers, closeModal } = this.props;
        const { is_admin, first_name, last_name, username, email } = this.state;
        const updatedUser = {
            is_admin, first_name, last_name, username, email
        }
        await updateUser(user.user_id, updatedUser);
        if (this.props.updateUserSuccess) {
            closeModal();
            getAllUsers();
        }
    }

    toggleEditPassword = (e) => {
        e.preventDefault();
        this.setState({
            editPassword: !this.state.editPassword
        })
    }

    toggleShowPassword = e => {
        this.setState({
            showPassword: e.target.checked
        })
    }

    updatePassword = async (e) => {
        e.preventDefault();
        const { password, newPassword, confirmNewPassword } = this.state;
        const { user, updateUserPassword, closeModal, getAllUsers } = this.props;
        const body = {
            password, newPassword, confirmNewPassword
        }
        await updateUserPassword(user.user_id, body);
        // If password change success, reset modal display, close modal, and get updated list of users
        if (this.props.updateUserSuccess) {
            setTimeout(() => {
                this.setState({
                    editPassword: false
                })
                getAllUsers()
                closeModal()
            }, 1500);
        }
    }

    render() {
        const { modalOpen, user, closeModal, updatePasswordMessage, updateUserSuccess } = this.props;
        const { editPassword, showPassword } = this.state;
        return (
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                onAfterOpen={this.setValues}
                style={customStyles}
                ariaHideApp={false}
            >
                <form onSubmit={editPassword ? this.updatePassword : this.handleSubmit}>
                    {
                        editPassword ?
                            null :
                            <div>
                                <div className="input-field">
                                    <p>
                                        <label>
                                            <input type="checkbox" className="filled-in" defaultChecked={user.is_admin} id="is_admin" onChange={this.handleChange} />
                                            <span>Admin?</span>
                                        </label>
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="first_name">First Name</label>
                                    <input type="text" id="first_name" defaultValue={user.first_name} onChange={this.handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="last_name">Last Name</label>
                                    <input type="text" id="last_name" defaultValue={user.last_name} onChange={this.handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" defaultValue={user.username} onChange={this.handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" defaultValue={user.email} onChange={this.handleChange} />
                                </div>
                                <div className="section">
                                    <button className="btn blue-grey darken-1" onClick={this.toggleEditPassword}>Edit Password</button>
                                </div>
                            </div>
                    }

                    {
                        editPassword ?
                            <div>
                                <div className="section">
                                    <button className="btn blue-grey darken-1" onClick={this.toggleEditPassword}>Back</button>
                                </div>
                                <div>
                                    <label htmlFor="password">Current Password</label>
                                    <input type={showPassword ? "text" : "password"} id="password" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="newPassword">New Password</label>
                                    <input type={showPassword ? "text" : "password"} id="newPassword" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                    <input type={showPassword ? "text" : "password"} id="confirmNewPassword" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <p>
                                        <label>
                                            <input type="checkbox" className="filled-in" id="showPassword" onChange={this.toggleShowPassword} />
                                            <span>Show characters</span>
                                        </label>
                                    </p>
                                </div>
                                {updatePasswordMessage ? <p className={updateUserSuccess ? "blue-text" : "red-text"}>{updatePasswordMessage}</p> : null}
                            </div> :
                            null
                    }

                    <div className="row">
                        <div className="input-field left">
                            <button className="btn">Update</button>
                        </div>
                        <div className="input-field right">
                            <button className="btn grey darken-1" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        updateUserSuccess: state.admin.updateUserSuccess,
        updatePasswordMessage: state.admin.updatePasswordMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (user_id, user) => dispatch(updateUser(user_id, user)),
        getAllUsers: () => dispatch(getAllUsers()),
        updateUserPassword: (user_id, body) => dispatch(updateUserPassword(user_id, body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
