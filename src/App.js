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
import CreateTeam from './pages/CreateTeam';
import TeamInvite from './pages/TeamInvite';
import Events from './pages/Events';
import Event from './pages/Event';
import { AuthProvider } from './config/context';
import TeamDetails from './pages/TeamDetails';
import Register from './pages/Register';
import AdminEvents from './pages/admin/Events';
import AdminEvent from './pages/admin/Event';

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
          <Route exact path="/events/:game">
            <Events />
          </Route>
          <Route path="/e/:id">
            <Event />
          </Route>
          <Route exact path="/teams">
            <Teams />
          </Route>
          <Route exact path="/teams/create">
            <CreateTeam />
          </Route>
          <Route path="/i/:id">
            <TeamInvite />
          </Route>
          <Route path="/teams/:id">
            <TeamDetails />
          </Route>
          <Route path="/register/:id">
            <Register />
          </Route>
          <Route path="/admin/events">
            <AdminEvents />
          </Route>
          <Route path="/admin/event/:id">
            <AdminEvent />
          </Route>
        </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;
