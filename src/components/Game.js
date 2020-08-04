import React, { Component } from 'react';
import QuizCard from './QuizCard';
import { fetchArtists, fetchTracksAndLyrics } from '../helpers';

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
        // const tracks = await fetchTracksAndLyrics(this.key, this.state.numQuestions);
        // const artistChoices = await fetchArtists(this.key, this.state.numQuestions);
        await this.setState({
          tracks: [
            {
              track: {
                lyrics: "hey there delilah what's it like in NYC...",
                artist_name: "Plain White Tees",
                name: "Hey there delilah",
              },
            },
            {
              track: {
                lyrics: "hey jude...",
                artist_name: "The Beatles",
                name: "Hey jude",
              },
            },
            {
              track: {
                lyrics:
                  "california, knows how to party, californiaaa, knows how...",
                artist_name: "tupac",
                name: "california",
              },
            },
          ],
          artistChoices: [
            "Taylor",
            "Harry",
            "Glass Animals",
            "Janis Joplin",
            "Andrea Bocelli",
            "Luciano Pavarotti",
            "Sylvan Esso",
            "Radio Head",
            "Roger Waters",
            "Haim",
            "Leon Bridges",
            "Julie"
          ],
        //   artistChoices,
        //   tracks,
          numQuestions: 3,
          attempted: false,
          lyricIdx: 0,
          score: 0,
        });
    }

    handlePlayerName(e) {
        e.preventDefault();
        let name = document.getElementById('playerName').value;
        this.setState({ player: name }); 
    }


    componentDidMount() {
        this.triggerNewPlayer();
    }

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



