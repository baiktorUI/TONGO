import React from 'react';

const BingoBoard = ({ markedNumbers, onNumberClick, showQuinaMessage }) => {
  return (
    <div className={`bingo-board ${showQuinaMessage ? 'disabled' : ''}`}>
      {[...Array(90)].map((_, i) => {
        const number = i + 1;
        const isMarked = markedNumbers.includes(number);
        return (
          <div
            key={number}
            className={`bingo-number ${isMarked ? 'marked' : 'clickable'} ${
              !isMarked && showQuinaMessage ? 'faded' : ''
            }`}
            onClick={() => !isMarked && !showQuinaMessage && onNumberClick(number)}
          >
            {number.toString().padStart(2, '0')}
          </div>
        );
      })}
    </div>
  );
};

export default BingoBoard;