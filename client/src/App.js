import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import IsLoaded from './IsLoaded';
import NavBar from './components/Navbar';
import SignIn from './components/auth/SignIn';
import UserHome from './components/user/UserHome';
import AdminSignIn from './components/auth/AdminSignIn';

import { verify, setIsLoading, setToken } from './actions/authActions';
import AdminHome from './components/admin/AdminHome';
import AdminTimesheets from './components/admin/AdminTimsheets';

class App extends Component {
  componentDidMount() {
    const { setToken, verify, setIsLoading } = this.props;
    const token = sessionStorage.getItem('token');
    if (token) {
      // Set global headers for axios, need to set in other parents components
      const tokenConfig = { 'token': token }
      axios.defaults.headers = tokenConfig

      // Set token in store for axios requests
      setToken(token);
      // Get user ID
      axios.get('/auth/verify/user')
        .then(res => {
          // Verify token and get user info
          verify(res.data.user_id)
        })
    }
    if (!token) {
      // If token does not exist, change isLoading to false to display sign-in page
      setIsLoading(false);
    }
  }

  render() {
    const { isLoading, authorized, isAdmin, children } = this.props;
    // console.log(this.props)

    return (
      <BrowserRouter>
        <IsLoaded isLoading={isLoading} children={children}>
          <div className="container">
            <NavBar />
            <Switch>
              <Route exact path='/' component={SignIn} />
              <Route exact path='/home' render={props =>
                authorized && !isAdmin ?
                  <UserHome {...props} /> :
                  <Redirect to='/' />} />
              <Route exact path='/admin' component={AdminSignIn} />
              <Route exact path='/admin/home' render={props =>
                authorized && isAdmin ?
                  <AdminHome {...props} /> :
                  <Redirect to='/admin' />} />
              <Route exact path='/admin/timesheets' render={props =>
                authorized && isAdmin ?
                  <AdminTimesheets {...props} /> :
                  <Redirect to='/admin' />} />
            </Switch>
          </div>
        </IsLoaded>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isLoading: state.auth.isLoading,
    authorized: state.auth.authorized,
    isAdmin: state.auth.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setIsLoading: bool => dispatch(setIsLoading(bool)),
    verify: (user_id) => dispatch(verify(user_id)),
    setToken: token => dispatch(setToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
