import React from 'react';
import QuizCardWrapper from './components/QuizCardWrapper';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <h1 className="App-h1"> Welcome to WhoSings!</h1>
      <Switch>
        <Route exact path="/" component={QuizCardWrapper} />
        <Route exact path="/global-rankings" />
        <Route exact path="/my-scores" />
      </Switch>

    </div>
  );
};


export default App;
