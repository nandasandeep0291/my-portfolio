import { FC, useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  activeColor: string;
  secondaryColor?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  growing: boolean;
}

// Improved color handling
const hexToRgba = (hex: string, opacity: number): string => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Handle shorthand hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Check if parsing was successful
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return `rgba(0, 0, 0, ${opacity})`; // Fallback to black if invalid hex
  }
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const AnimatedBackground: FC<AnimatedBackgroundProps> = ({ 
  activeColor = '#4a90e2',  // Default blue color
  secondaryColor = '#e2e8f0' // Default light gray
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 80;
    const connectionDistance = 100;
    let animationFrameId: number;

    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    const createParticle = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.3 + 0.2,
      growing: Math.random() > 0.5
    });

    const updateParticle = (particle: Particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Smooth edge wrapping
      if (particle.x < 0) particle.x = window.innerWidth;
      if (particle.x > window.innerWidth) particle.x = 0;
      if (particle.y < 0) particle.y = window.innerHeight;
      if (particle.y > window.innerHeight) particle.y = 0;

      // Subtle pulsing
      if (particle.growing) {
        particle.opacity += 0.005;
        if (particle.opacity >= 0.5) particle.growing = false;
      } else {
        particle.opacity -= 0.005;
        if (particle.opacity <= 0.2) particle.growing = true;
      }
    };

    const drawConnections = (particles: Particle[]) => {
      particles.forEach((p1, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = Math.min(
              ((1 - distance / connectionDistance) * 0.15 * p1.opacity * p2.opacity),
              0.15
            );
            ctx.beginPath();
            ctx.strokeStyle = hexToRgba(activeColor, opacity);
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
    };

    const drawBackground = () => {
      // Create subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, hexToRgba(activeColor, 0.05));
      gradient.addColorStop(1, hexToRgba(secondaryColor, 0.05));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      drawBackground();
      
      // Draw connections
      drawConnections(particles);
      
      // Update and draw particles
      particles.forEach(particle => {
        updateParticle(particle);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(activeColor, particle.opacity);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeColor, secondaryColor]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: -1 }}
    />
  );
};

export default AnimatedBackground;