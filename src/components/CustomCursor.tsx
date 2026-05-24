import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      // Perubahan desain total ada di baris ini:
      // - w-4 h-4: Ukuran diperkecil drastis biar subtle
      // - bg-white mix-blend-difference: Rahasia agar warnanya adaptif dan elegan!
      // - duration-75: Animasi lebih cepat dan responsif
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full bg-white mix-blend-difference transition-transform duration-75 ease-out will-change-transform max-md:hidden"
    />
  );
}
