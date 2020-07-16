import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import GameScreen from './pages/GameScreen';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <BrowserRouter>
      <div> Trivia </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/GameScreen" component={GameScreen} />
        <Route exact path="/Settings" component={Settings} />
        <Route exact path="/Ranking" component={Ranking} />
      </Switch>
    </BrowserRouter>
  );
}
