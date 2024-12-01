import React from 'react';

const PreviousNumbers = ({ numbers, showQuinaMessage }) => {
  if (showQuinaMessage) {
    return <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>;
  }

  return (
    <div className="side-content">
      {numbers.map((num, index) => (
        <span key={index} className={`previous-number opacity-${index}`}>
          {num.toString().padStart(2, '0')}
        </span>
      ))}
    </div>
  );
};

export default PreviousNumbers;