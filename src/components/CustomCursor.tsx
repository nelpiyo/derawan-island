import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  // Pake ref biar gak memicu re-render tiap kali mouse gerak
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Manipulasi DOM langsung buat performa maksimal di React
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Jangan lupa cleanup memory!
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      // Tailwind classes buat styling, bikin transparan & ilang di mobile (max-md:hidden)
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border-2 border-white/60 transition-transform duration-150 ease-out will-change-transform max-md:hidden"
    />
  );
}
