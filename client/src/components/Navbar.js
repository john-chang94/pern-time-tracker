import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ authorized, isAdmin }) => {
    const logo = authorized ? <Link to={isAdmin ? '/admin-home' : '/home'} >TCube</Link> : <span>TCube</span>

    return (
        <nav className="nav-wrapper grey darken-2">
            <div className="center brand-logo">
                {logo}
            </div>
            {
                authorized ?
                    <ul>
                        <li>Welcome, NAME</li>
                        <li>Sign Out</li>
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
        isAdmin: state.auth.isAdmin
    }
}

export default connect(mapStateToProps)(Navbar);