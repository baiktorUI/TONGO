import React from 'react';

const CurrentNumber = ({ number, animate, showQuinaMessage }) => {
  if (showQuinaMessage) {
    return <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>;
  }

  return (
    <div className={`current-number ${animate ? 'animate-flash' : ''}`}>
      {number !== null ? number.toString().padStart(2, '0') : "?"}
    </div>
  );
};

export default CurrentNumber;