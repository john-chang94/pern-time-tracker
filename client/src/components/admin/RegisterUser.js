import React, { Component } from 'react'
import { connect } from 'react-redux';
import { register } from '../../actions/adminActions';

class RegisterUser extends Component {
    state = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        is_admin: false,
        showPassword: false
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

    handleSubmit = e => {
        e.preventDefault();
        const user = {
            ...this.state
        }
        delete user.showPassword
        this.props.register(user);
    }

    toggleShowPassword = e => {
        this.setState({
            showPassword: e.target.checked
        })
    }

    render() {
        const { showPassword, is_admin } = this.state;
        const { adminMessage } = this.props;
        return (
            <div>
                <h5>Register new user</h5>
                <form className="section">
                    <div className="input-field">
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" checked={is_admin} id="is_admin" onChange={this.handleChange} />
                                <span>Admin?</span>
                            </label>
                        </p>
                    </div>
                    <div className="input-field">
                        <input type="text" id="first_name" onChange={this.handleChange} />
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="last_name" onChange={this.handleChange} />
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="username" onChange={this.handleChange} />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                        <input type="email" id="email" onChange={this.handleChange} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input type={showPassword ? "text" : "password"} id="password" onChange={this.handleChange} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" id="showPassword" onChange={this.toggleShowPassword} />
                                <span>Show password</span>
                            </label>
                        </p>
                    </div>
                    <div className="input-field">
                        <button className="btn" onClick={this.handleSubmit}>Register</button>
                    </div>
                    {adminMessage ? <p className={"red-text"}>{adminMessage}</p> : null}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        adminMessage: state.admin.adminMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (user) => dispatch(register(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);