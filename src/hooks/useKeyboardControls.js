import { useEffect, useCallback } from 'react';

const useKeyboardControls = ({ setShowLiniaCantada, setShowQuinaMessage, handleUndo }) => {
  const handleKeyPress = useCallback((event) => {
    switch (event.key.toLowerCase()) {
      case 'l':
        setShowLiniaCantada(prev => !prev);
        break;
      case 'q':
        setShowQuinaMessage(prev => !prev);
        break;
      case 'backspace':
        handleUndo();
        break;
    }
  }, [setShowLiniaCantada, setShowQuinaMessage, handleUndo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};

export default useKeyboardControls;