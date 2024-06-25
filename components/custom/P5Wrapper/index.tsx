"use client";

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

interface P5WrapperProps {
  sketch: (p: p5) => void;
  width: number;
  height: number;
}

const P5Wrapper: React.FC<P5WrapperProps> = ({ sketch, width, height }) => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sketchRef.current) {
      const p5Instance = new p5((p: p5) => {
        p.setup = () => {
          p.createCanvas(width, height);
          sketch(p);
        };
      }, sketchRef.current);
      return () => p5Instance.remove(); // Cleanup the p5 instance on component unmount
    }
  }, [sketch, width, height]);

  return <div ref={sketchRef} style={{ width, height }}></div>;
};

export default P5Wrapper;
