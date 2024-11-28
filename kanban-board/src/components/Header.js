import React from 'react';

const Header = ({ undo, redo, addColumn }) => {
  return (
    <div className="header">
      <button onClick={addColumn}>Add Column</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
};

export default Header;
