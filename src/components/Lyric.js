import React from 'react';

const Lyric = ({ lyrics }) => {
    const arr = lyrics.split('\r');
    return (
        <div className='lyric'> {arr[0]} </div>
    );
};

export default Lyric;
