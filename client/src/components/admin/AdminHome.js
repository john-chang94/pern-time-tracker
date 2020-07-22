import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminHome = ({ token }) => {
    if (token) {
        // Set global headers for axios once token is in store
        const tokenConfig = { 'token': token }
        axios.defaults.headers = tokenConfig
    }

    return (
        <div className="row section">
            <div className="col m3">
                <Link to='/admin/timesheets'>
                    <div className="card">
                        <div className="center card-content">
                            <i className="large material-icons">assessment</i>
                            <h5 className="center black-text">Timesheets</h5>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col m3">
                <Link to='/admin/users'>
                    <div className="card">
                        <div className="center card-content">
                            <i className="large green-text material-icons">group</i>
                            <h5 className="center black-text">Users</h5>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col m3">
                <Link to='/admin/projects'>
                    <div className="card">
                        <div className="center card-content">
                            <i className="large orange-text material-icons">work</i>
                            <h5 className="center black-text">Projects</h5>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col m3">
                <Link to='/admin/settings'>
                    <div className="card">
                        <div className="center card-content">
                            <i className="large black-text material-icons">settings</i>
                            <h5 className="center black-text">Settings</h5>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(AdminHome);