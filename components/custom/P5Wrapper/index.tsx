"use client";

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

interface P5WrapperProps {
  sketch: (container: React.RefObject<HTMLDivElement>) => (p: p5) => void;
}

const P5Wrapper: React.FC<P5WrapperProps> = ({ sketch }) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && sketchRef.current) {
      const p5Instance = new p5(sketch(containerRef), sketchRef.current);

      // Clean up the p5 instance on component unmount
      return () => {
        p5Instance.remove();
      };
    }
  }, [sketch]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <div ref={sketchRef}></div>
    </div>
  );
};

export default P5Wrapper;
