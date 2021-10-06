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
import CreateProfile from './pages/CreateProfile';
import { AuthProvider } from './config/context';

function App() {
  
  return (
    <AuthProvider>
    <Router>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create-profile">
            <CreateProfile />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;
