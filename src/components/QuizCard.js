import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Lyric from './Lyric';
import Artist from './Artist';
import Score from './Score';
import { shuffle } from '../helpers';
import NewGameBtn from './NewGameBtn';

class QuizCard extends Component {
    constructor(props) {
        super(props); 
        this.state = this.props.state;
        this.handleAttempt = this.handleAttempt.bind(this);
        this.handleNewGame = this.state.handleNewGame.bind(this);
    }

    generateChoices() {
        const { tracks, lyricIdx, artists} = this.state;
        const correctAnswer = tracks[lyricIdx].track.artist_name;
        const choices = [
            <Artist 
                name={correctAnswer} 
                key={correctAnswer} 
                answer={true} 
                handleAttempt={this.handleAttempt} 
            />
        ];
        // generateWrongChoices helper method
        // concat correct choice w wrongchoices
        // generate Artist components together
        while (choices.length < 3) {
            let randomArtist = artists[Math.floor(Math.random() * 10)];
            choices.push( 
                <Artist 
                    name={randomArtist} 
                    key={randomArtist} 
                    answer={false} 
                    handleAttempt={this.handleAttempt}
                /> 
            );
        }

        return choices;
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
        return(
            <>
                <header>Game Over ! </header>
                <Score score={this.state.score} n={this.state.numQuestions} />
                <NewGameBtn callback={this.props.handleNewGame}/>
            </>
        )
    }

    render() {
        console.log(this.state.lyricIdx, this.state.numQuestions)
        if (this.state.lyricIdx >= this.state.numQuestions - 1) return this.handleGameOver();
        const { track } = this.state.tracks[this.state.lyricIdx]
        const choices = this.generateChoices();
        
        return (
            <div className='quiz-card'>
                <Lyric lyrics={track.lyrics} />
                { shuffle(choices) }
                <Score score={this.state.score} n={this.state.numQuestions} />
            </div>
        )
    }
}

export default QuizCard;



