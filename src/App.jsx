import { useEffect, useRef } from 'react';

function SignalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrame;
    let width = 0;
    let height = 0;
    let particles = [];
    const pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.floor(Math.min(90, Math.max(38, width / 18)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        size: 0.8 + Math.random() * 1.9,
        hue: index % 3 === 0 ? 178 : index % 3 === 1 ? 36 : 316,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(5, 7, 13, 0.44)';
      context.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 150) {
            particle.x -= dx * 0.0018;
            particle.y -= dy * 0.0018;
          }
        }

        context.beginPath();
        context.fillStyle = `hsla(${particle.hue}, 92%, 68%, 0.72)`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const distance = Math.hypot(other.x - particle.x, other.y - particle.y);

          if (distance < 128) {
            context.beginPath();
            context.strokeStyle = `rgba(137, 220, 235, ${0.13 * (1 - distance / 128)})`;
            context.lineWidth = 1;
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    const updatePointer = (event) => {
      pointer.active = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const leavePointer = () => {
      pointer.active = false;
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', updatePointer);
    window.addEventListener('pointerleave', leavePointer);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', leavePointer);
    };
  }, []);

  return <canvas className="signal-field" ref={canvasRef} aria-hidden="true" />;
}

function App() {
  return (
    <main className="launch-page">
      <SignalField />
      <div className="noise" aria-hidden="true" />
      <h1>Launching Soon</h1>
    </main>
  );
}

export default App;
