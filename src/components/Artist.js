import React from 'react'
import Button from "react-bootstrap/Button";

const Artist = ({ name, answer, handleAttempt }) => {

    const handleClick = (e) => {
        e.preventDefault();
        let btn = document.getElementById(name);
        btn.style.backgroundColor = (answer) ? 'lightgreen' : 'salmon';
        setTimeout(handleAttempt.bind(null, answer), 100); // explore not using setTimeout
    }

    return (
        <div className="artist">
            <Button
                id={name}
                onClick={handleClick}
                value={name}
                variant="outline-secondary"
                size="lg">
                {name}
            </Button>
        </div>
    );
}

export default Artist;
