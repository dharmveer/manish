import React, { Component } from 'react';
import './App.css';
import Home from './copmponents/Home';
import About from './copmponents/About';
//import Post from './copmponents/Post';
import Auth from './copmponents/Auth';
import Protected from './copmponents/Protected';
import Nav from './copmponents/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Router>
          <Nav/>
          <Switch>
          <Route path="/about">
            <Protected copmponents={About}/>
          </Route>
          <Route path="/home">
          <Protected copmponents={Home}/>
          </Route>
          <Route path="/">
            <Auth/>
          </Route>
        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
