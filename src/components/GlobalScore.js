import React, { Component } from 'react';
import { getAllHighScores } from '../helpers';
import Score from './Score';
import TableWrapper from './TableWrapper';


const GlobalScore = () => {

    let sortedScores = [];
    getAllHighScores().forEach( (playerScore, i) => {
        let [name, score] = playerScore;
        name = name.split('-')[0];
        sortedScores.push(<Score score={score} datum={name} key={i} />);
    })
    
    return (
        <>
            <p className="table-header"> High Score Rankings 🏆</p>
            <TableWrapper rowData={sortedScores} collumn={'Name'} />
        </>
    );
};

export default GlobalScore;
