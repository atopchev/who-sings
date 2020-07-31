import { Component } from 'react';

class QuizScreen extends Component {

    state = { 
        player: '',
        score: 0,
        questions: 0
    }

    render(){
        return 
            <div> Card 
                <span>Player Name</span>
                <span>Time</span>
                <span>Question Number</span>

                <link>
                <span>points</span>
            </div>
    }
}

export default QuizScreen;