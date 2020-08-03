import React from 'react';

const NewGameBtn = ({ callback, btnText='New Game' }) => (
    <div>
        <button onClick={callback}>{btnText}</button>
        <br></br>
        <br></br>
    </div>
);

export default NewGameBtn;

