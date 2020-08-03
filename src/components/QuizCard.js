import React, { Component } from 'react';
import Lyric from './Lyric';
import Artist from './Artist';
import Score from './Score';

class QuizCard extends Component {
    constructor(props) {
        super(props); 
        this.state = this.props.state;
        this.handleAttempt = this.handleAttempt.bind(this)
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
        this.setState({ 
            attempted: !(this.state.attempted), 
            lyricIdx: updatedLyricIdx ,
            score: (ans) ? this.state.score += 100 : this.state.score -= 100 
        });
    }

    render() {
        const { track } = this.state.tracks[this.state.lyricIdx]
        console.log(this.state.tracks);
        const choices = this.generateChoices();
        
        return (
            <div className='quiz-card'>
                <Lyric lyrics={track.lyrics} />
                { shuffle(choices) }
                <Score score={this.state.score} n={this.state.n} />
            </div>
        )
    }
}

export default QuizCard;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
    return arr;
};

