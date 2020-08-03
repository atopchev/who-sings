import React from 'react';
import Button from 'react-bootstrap/Button'

const NewGameBtn = ({ callback, btnText = "New Game" }) => (
  <div>
    <Button 
        onClick={callback} 
        variant="outline-secondary"
        size="lg">
      {btnText}
    </Button>
  </div>
);

export default NewGameBtn;

