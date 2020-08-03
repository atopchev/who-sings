import React, { Component } from 'react';
import Score from './Score';
import NewGameBtn from './NewGameBtn';
import TableWrapper from './TableWrapper';


class MyScores extends Component {

    state = {
        scores: [] 
    };

    handleBack() {
      this.props.history.goBack();
    }

    componentWillMount(){
        let player = this.props.match.params.username;
        this.setState({
          scores: JSON.parse(localStorage.getItem(player)),
        });
    };

    render() {
               const prevScores = [];
               for (const [key, value] of Object.entries(this.state.scores)) {
                    prevScores.push(<Score score={value} datum={key} />);
               }

               return (
                 <>
                   <p className="table-header">
                     Scores for {this.props.match.params.username}
                   </p>
                   <TableWrapper rowData={prevScores}/>
                   <NewGameBtn callback={this.handleBack.bind(this)} />
                 </>
               );
             };
};

export default MyScores;
