import React from 'react';
import Game from './components/Game';
import { Route, Switch, Link } from 'react-router-dom';
import MyScores from './components/MyScores';
import GlobalScore from './components/GlobalScore';


const App = () => {
	return (
		<div className="App">
			<Link to="/">
				<img
					alt=''
					className="logo"
					src="https://img.icons8.com/ios/50/000000/singing-teacher.png"/>
			</Link>
			<Switch>
				<Route exact path="/" component={Game} />
				<Route exact path="/global-rankings" component={GlobalScore} />
				<Route path="/my-scores/:username" component={MyScores} />
			</Switch>
		</div>
	);
};

export default App;
