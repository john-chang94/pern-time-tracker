import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './components/Navbar';
import SignIn from './components/auth/SignIn';
import UserHome from './components/user/UserHome';

class App extends Component {
  render() {
    const { authorized, isAdmin } = this.props;
    console.log(authorized)
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.auth.authorized,
    isAdmin: state.auth.isAdmin
  }
}

export default connect(mapStateToProps)(App);
