const FloatingDots = () => {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 6, // 6-14px - larger dots
    left: Math.random() * 100, // 0-100%
    top: Math.random() * 100, // 0-100%
    delay: Math.random() * 4, // 0-4s delay
    duration: Math.random() * 2 + 3, // 3-5s duration
    opacity: Math.random() * 0.4 + 0.6, // 0.6-1.0 opacity
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            opacity: dot.opacity,
            backgroundColor: '#D4AF37', // Dark golden color
            animation: `dotBounce ${dot.duration}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
            boxShadow: '0 2px 8px rgba(184, 134, 11, 0.3)',
          }}
        />
      ))}
    </div>
  );
};
export default FloatingDots;