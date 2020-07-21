import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../actions/authActions';

const Navbar = ({ authorized, isAdmin, user, signOut }) => {
    const logo = authorized ? <Link to={isAdmin ? '/admin/home' : '/home'} >TCube</Link> : <span>TCube</span>

    const logout = () => {
        sessionStorage.removeItem('token');
        signOut();
    }

    return (
        <nav className="nav-wrapper grey darken-2">
            <div className="center brand-logo">
                {logo}
            </div>
            {
                authorized ?
                    <ul className="right">
                        <li style={{ marginRight: '10px' }}>Welcome, {user.first_name}</li>
                        <li><a href="/" onClick={logout}>Sign Out</a></li>
                    </ul>
                    :
                    null
            }
        </nav>

    )
}

const mapStateToProps = state => {
    return {
        authorized: state.auth.authorized,
        isAdmin: state.auth.isAdmin,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);