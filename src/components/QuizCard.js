import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Lyric from './Lyric';
import Artist from './Artist';
import StatsBar from "./StatsBar";
import { shuffle, storeScore } from '../helpers';
import NewGameBtn from './NewGameBtn';


class QuizCard extends Component {
    constructor(props) {
        super(props); 
        this.key = process.env.REACT_APP_API_KEY;
        this.state = this.props.state;
        this.handleAttempt = this.handleAttempt.bind(this);
        this.handleNewGame = this.props.handleNewGame.bind(this);
    }

    generateChoices() {
        const { tracks, lyricIdx } = this.state;
        const correctAnswer = tracks[lyricIdx].track.artist_name;
        const choices = [
            <Artist 
                name={correctAnswer} 
                key={correctAnswer} 
                answer={true} 
                handleAttempt={this.handleAttempt} 
            />
        ];
        return choices.concat( this.generateNWrongChoices(2) );
    }

    generateNWrongChoices(n) {
        let wrongChoices = [];
        while (wrongChoices.length < n) {
          let randomArtist = this.state.artistChoices.pop();
          wrongChoices.push(
            <Artist
              name={randomArtist}
              key={randomArtist}
              answer={false}
              handleAttempt={this.handleAttempt}
            />
          );
        }
        return wrongChoices;
    }

    handleAttempt(ans) {
        let updatedLyricIdx = this.state.lyricIdx + 1;
        let updatedScore = (ans) ? this.state.score + 100 : this.state.score - 100;
        this.setState({ 
            attempted: !(this.state.attempted), 
            lyricIdx: updatedLyricIdx ,
            score: updatedScore 
        });
    }

    handleGameOver(){
        const { player, score } = this.state;
        storeScore(player, score);
        return (
          <>
            <header>Game Over!</header>
            <StatsBar
              score={this.state.score}
              n={this.state.numQuestions}
              idx={this.state.lyricIdx}
              player={this.state.player}
              gameOver={true}
            />
            <NewGameBtn callback={this.handleNewGame} />
            <NewGameBtn
              callback={this.props.triggerNewPlayer}
              btnText="New Player"
            />
          </>
        );
    }

    render() {
        if (this.state.lyricIdx >= this.state.numQuestions) return this.handleGameOver();
        console.log('state', this.state);
        const { track } = this.state.tracks[this.state.lyricIdx]
        const choices = this.generateChoices();
        debugger;
        return (
          <>
            <StatsBar
              score={this.state.score}
              n={this.state.numQuestions}
              idx={this.state.lyricIdx}
              player={this.state.player}
            />
            <div className="quiz-card">
              <Lyric lyrics={track.lyrics} />
              {shuffle(choices)}
            </div>
          </>
        );
    };
};

export default QuizCard;



