import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.props.signIn(this.state);
        sessionStorage.setItem('token', this.props.user.token)
    }

    render() {
        const { authError } = this.props;
        // Redirect to user home once authorized after sign-in
        if (this.props.authorized) {
            return <Redirect to='/home' />
        }
        return (
            <form style={{ marginTop: '35px' }} onSubmit={this.handleSubmit}>
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <button style={{ display: 'block' }} className="btn blue-grey">Sign In</button>
                    <div style={{ marginTop: '10px' }} className="red-text left">
                        { authError ? <p>{authError}</p> : null}
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        authorized: state.auth.authorized,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: credentials => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);