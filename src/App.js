import React, {useState, useEffect} from 'react';
import { auth } from './config/firebase';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';
import UpdateProfile from './pages/UpdateProfile';
import Admin from './pages/Admin';
import Teams from './pages/Teams';
import Events from './pages/Events';
import { AuthProvider } from './config/context';

function App() {
  
  return (
    <AuthProvider>
    <Router>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route exact path="/create-profile">
            <CreateProfile />
          </Route>
          <Route exact path="/update-profile">
            <UpdateProfile />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/events">
            <Events />
          </Route>
          <Route exact path="/teams">
            <Teams />
          </Route>
        </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;
