import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './components/Navbar';
import SignIn from './components/auth/SignIn';
import UserHome from './components/user/UserHome';
import IsLoaded from './IsLoaded';
import { verify, setIsLoading, setConfig } from './actions/authActions';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const config = { headers: { 'token': token } }
      // Set config in state for axios requests
      this.props.setConfig(config);
      // Get user ID
      axios.get('/auth/verify/user', config)
        .then(res => {
          // Verify token and get user info
          this.props.verify(config, res.data.user_id)
        })
    }
    if (!token) {
      // If token does not exist, change isLoading to false to display sign-in page
      this.props.setIsLoading(false);
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
            </Switch>
          </div>
        </IsLoaded>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    authorized: state.auth.authorized,
    isAdmin: state.auth.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setIsLoading: bool => dispatch(setIsLoading(bool)),
    verify: (token, user_id) => dispatch(verify(token, user_id)),
    setConfig: config => dispatch(setConfig(config))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
