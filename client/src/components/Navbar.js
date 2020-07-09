import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ auth, isAdmin }) => {
    const logo = auth ? <Link to={isAdmin ? '/admin-home' : '/home'}>TCube</Link> : <span>TCube</span>

    return (
        <nav className="nav-wrapper grey darken-2">
            {logo}
            {
                auth ?
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
        auth: state.auth.auth,
        isAdmin: state.auth.isAdmin
    }
}

export default connect(mapStateToProps)(Navbar);