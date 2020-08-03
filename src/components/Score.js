import React from 'react';

const Score = ({ datum, score }) => {
    return (
      <tr className="score-row">
            <td>{datum}</td>
            <td>{score}</td>
      </tr>
    );
};

export default Score;
