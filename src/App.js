import React from 'react';
import Game from './components/Game';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <h1 className="App-h1"> Welcome to WhoSings!</h1>
      <Switch>
        <Route exact path="/" component={Game} />
        <Route exact path="/global-rankings" />
        <Route exact path="/my-scores" />
      </Switch>

    </div>
  );
};


export default App;
