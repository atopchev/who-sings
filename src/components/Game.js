import React, { Component } from 'react';
import QuizCard from './QuizCard';
import { fetchArtists, fetchTracksAndLyrics, generateWrongChoicesOffline } from '../helpers';

/** 
 * This wrapper component for the purpose of making all 
 *      necessary API calls. 
 * First, it fetches n * 2 artists, to create a pool of options 
 *      for quiz answer choices. 
 * Second, it fetches n tracks, and the lyrics for each track. 
 * Lasty, it renders the actual QuizComponent with appropriate data. 
 */
class Game extends Component {
  	constructor(props) {
		super(props);
		this.key = process.env.REACT_APP_API_KEY;
		this.state = {
		  player: '',
		  numQuestions: 3,
		  tracks: [],
		  artistChoices: [],
		  attempted: false,
		  lyricIdx: 0,
		  score: 0
		  };
		  
	  	this.handlePlayerName = this.handlePlayerName.bind(this);
	  	this.triggerNewPlayer = this.triggerNewPlayer.bind(this);
	};

	async triggerNewPlayer() {
		await this.setState({ player: ''});
		await this.handleNewGame();
	};

	async handleNewGame() {
		let [tracks, artistChoices] = await Promise.all([
			await fetchTracksAndLyrics(this.key, this.state.numQuestions),
			await fetchArtists(this.key, this.state.numQuestions)
		]);
		// ** If API offline, seed with custom data:
		if (artistChoices.length < this.state.numQuestions*2 ) {
			artistChoices = generateWrongChoicesOffline(artistChoices, this.state.numQuestions);
		}
		this.setState({
			artistChoices,
			tracks,
			numQuestions: 3,
			attempted: false,
			lyricIdx: 0,
			score: 0,
		});
	}

	async componentDidMount() {
		this.handleNewGame();
	}

	handlePlayerName(e) {
		e.preventDefault();
		let name = document.getElementById('playerName').value;
		this.setState({ player: name });
	}

	// async componentWillMount() {
	// 	await this.handleNewGame();
	// } 

  render() {
	const returnValue = (!this.state.player.length) ? (
		<form className="player-form" onSubmit={this.handlePlayerName}>
		  <header className="App-header"> Welcome to WhoSings!</header>
		  Player Name
		  <input
			id="playerName"
			type="text"
			placeholder="Enter name and hit enter..."
		  ></input>
		</form>
	  ) : (
		<QuizCard
		  state={this.state}
		  handleNewGame={this.handleNewGame}
		  triggerNewPlayer={this.triggerNewPlayer}
		/>
	  ); 
	  return returnValue;
  };
};

export default Game;



