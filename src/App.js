import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div> Trivia </div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/Settings' component={Settings} />
      </Switch>
    </BrowserRouter>
  );
}
