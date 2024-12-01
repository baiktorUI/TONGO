import React, { useState, useRef, useCallback } from 'react';
import './styles/App.css';
import LogoImage from './assets/logo.png';
import BingoBoard from './components/BingoBoard';
import CurrentNumber from './components/CurrentNumber';
import PreviousNumbers from './components/PreviousNumbers';
import useKeyboardControls from './hooks/useKeyboardControls';
import { launchFireworks, launchSchoolPride, stopConfetti } from './utils/confetti';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [showLiniaCantada, setShowLiniaCantada] = useState(false);
  const [showQuinaMessage, setShowQuinaMessage] = useState(false);
  const [animate, setAnimate] = useState(false);

  const fireworksIntervalRef = useRef(null);
  const schoolPrideAnimationRef = useRef(null);

  const handleNumberClick = (number) => {
    if (!showQuinaMessage && !markedNumbers.includes(number)) {
      setCurrentNumber(number);
      setMarkedNumbers(prev => [...prev, number]);
      setPreviousNumbers(prev => [number, ...prev.slice(0, 4)]);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }
  };

  const handleUndo = useCallback(() => {
    if (!showQuinaMessage && markedNumbers.length > 0) {
      const updatedMarkedNumbers = markedNumbers.slice(0, -1);
      const lastMarkedNumber = updatedMarkedNumbers[updatedMarkedNumbers.length - 1] || null;
      setMarkedNumbers(updatedMarkedNumbers);
      setPreviousNumbers(updatedMarkedNumbers.slice(-5));
      setCurrentNumber(lastMarkedNumber);
    }
  }, [markedNumbers, showQuinaMessage]);

  useKeyboardControls({ setShowLiniaCantada, setShowQuinaMessage, handleUndo });

  React.useEffect(() => {
    if (showLiniaCantada) {
      launchFireworks(fireworksIntervalRef);
    } else {
      stopConfetti(fireworksIntervalRef, { current: null });
    }
  }, [showLiniaCantada]);

  React.useEffect(() => {
    if (showQuinaMessage) {
      launchFireworks(fireworksIntervalRef);
      launchSchoolPride(schoolPrideAnimationRef);
    } else {
      stopConfetti(fireworksIntervalRef, schoolPrideAnimationRef);
    }
  }, [showQuinaMessage]);

  return (
    <div className="app-container">
      <div className="current-number-box">
        <CurrentNumber 
          number={currentNumber} 
          animate={animate} 
          showQuinaMessage={showQuinaMessage} 
        />
      </div>

      <div className="side-box">
        <PreviousNumbers 
          numbers={previousNumbers} 
          showQuinaMessage={showQuinaMessage} 
        />
      </div>

      <div className={`large-box ${showQuinaMessage ? 'highlight' : ''}`}>
        <BingoBoard 
          markedNumbers={markedNumbers} 
          onNumberClick={handleNumberClick} 
          showQuinaMessage={showQuinaMessage} 
        />
      </div>

      <div className="small-box">
        {showQuinaMessage ? (
          <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>
        ) : (
          showLiniaCantada && (
            <span className={`linia-cantada ${showLiniaCantada ? 'show' : ''}`}>
              LÍNIA CANTADA!! 🎉🎉
            </span>
          )
        )}
      </div>

      <div className="additional-box">
        <img src={LogoImage} alt="Logo Quina Tongo" className="logo-image" />
      </div>
    </div>
  );
};

export default App;