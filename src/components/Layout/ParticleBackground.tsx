import { useEffect, useRef } from 'react';
import { useTheme } from '../../lib/theme';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = 150; // Moderate count for clean look

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 2; // Increased speed
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 0.5; // Small, subtle dots

        // Theme-aware colors
        const isDark =
          theme === 'dark' ||
          (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

        const lightColors = ['rgb(244, 66, 66)', 'rgb(0, 0, 0)', 'rgb(66, 133, 244)'];
        const darkColors = ['rgb(244, 66, 66)', 'rgb(255, 255, 255)', 'rgb(100, 160, 255)'];

        const colors = isDark ? darkColors : lightColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]); // Re-run when theme changes

  const isDark = theme === 'dark';

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000 ${
        isDark ? 'mix-blend-screen opacity-100' : 'mix-blend-multiply opacity-100'
      }`}
    />
  );
};

export default ParticleBackground;
