import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './components/Navbar';
import SignIn from './components/auth/SignIn';
import UserHome from './components/user/UserHome';
import AuthIsLoaded from './IsLoaded';
import { verify, setIsLoading } from './actions/authActions';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (token) {
      // If token exists, get user ID then verify token
      const config = { headers: { 'token': token } }
      axios.get('/auth/verify/user', config)
        .then(res => {
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
    console.log(this.props)

    return (
      <BrowserRouter>
        <AuthIsLoaded isLoading={isLoading} children={children}>
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
        </AuthIsLoaded>
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
    verify: (token, user_id) => dispatch(verify(token, user_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
