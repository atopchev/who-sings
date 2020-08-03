import React from 'react'

const Score = ({ score, n}) => {
    return (
    <h1> {score} / {n*100}</h1>
    );
};

export default Score;
