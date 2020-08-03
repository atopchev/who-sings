import React from 'react'

const Artist = ({ name, answer, handleAttempt }) => {

    const handleClick = (e) => {
        e.preventDefault();

        let btn = document.getElementById(name);
        btn.style.backgroundColor = (answer) ? 'lightgreen' : 'salmon';
        setTimeout(handleAttempt.bind(null, answer), 100); // explore not using setTimeout
        // handleAttempt.bind(null, answer)();
    }

    return (
        <div className='artist'>
            <button id={name} onClick={handleClick} value={name}>{name}</button>
        </div>
    )
}

export default Artist;
