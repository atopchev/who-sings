import React from 'react';
import Game from './components/Game';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <img className="logo" src="https://img.icons8.com/ios/50/000000/singing-teacher.png" />
      <Switch>
        <Route exact path="/" component={Game} />
        <Route exact path="/global-rankings" />
        <Route exact path="/my-scores" />
      </Switch>
    </div>
  );
};


export default App;
