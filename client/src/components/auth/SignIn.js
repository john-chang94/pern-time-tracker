import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, setToken } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';
import { getProjects, getEntries } from '../../actions/userActions';

class SignIn extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { signIn, setToken, getProjects, getEntries } = this.props;
        await signIn(this.state);
        if (this.props.token) {
            await setToken(this.props.token);
            if (this.props.user) {
                await getProjects(this.props.user.user_id)
                await getEntries(this.props.user.user_id)
            }
            sessionStorage.setItem('token', this.props.token)
        }
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
                    <input type="text" id="username" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={this.handleChange} />
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
        token: state.auth.token,
        authorized: state.auth.authorized,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: credentials => dispatch(signIn(credentials)),
        setToken: token => dispatch(setToken(token)),
        getProjects: (token, user_id) => dispatch(getProjects(token, user_id)),
        getEntries: (token, user_id) => dispatch(getEntries(token, user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);