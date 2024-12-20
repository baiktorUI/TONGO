import confetti from 'canvas-confetti';

export const launchFireworks = (intervalRef) => {
  const end = Date.now() + 3 * 1000;
  intervalRef.current = setInterval(() => {
    confetti({
      particleCount: 150,
      startVelocity: 30,
      spread: 360,
      ticks: 160,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      zIndex: 1000,
    });
    if (Date.now() >= end) clearInterval(intervalRef.current);
  }, 250);
};

export const launchSchoolPride = (animationFrameRef) => {
  const colors = ['#E94E18', '#312C86', '#FFFFFF'];
  const end = Date.now() + 10 * 1000;
  
  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });
    if (Date.now() < end) {
      animationFrameRef.current = requestAnimationFrame(frame);
    }
  };

  frame();
};

export const stopConfetti = (intervalRef, animationFrameRef) => {
  clearInterval(intervalRef.current);
  cancelAnimationFrame(animationFrameRef.current);
  confetti.reset();
};