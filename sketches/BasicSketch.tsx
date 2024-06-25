"use client";

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const basicSketch = (p: p5, containerRef: React.RefObject<HTMLDivElement>) => {
  const aspectRatio = 16 / 9;

  const resizeCanvas = () => {
    const width = containerRef.current?.offsetWidth || 1600;
    const height = width / aspectRatio;
    p.resizeCanvas(width, height);
  };

  p.setup = () => {
    const width = containerRef.current?.offsetWidth || 1600;
    const height = width / aspectRatio;
    p.createCanvas(width, height);
    
  };

  p.draw = () => {
    p.clear();
    p.background("teal"); // Light gray background
    p.fill(255, 0, 0); // Red color
    p.ellipse(p.width / 2, p.height / 2, 50, 50); // Draw circle in the center
  };

  p.windowResized = resizeCanvas;
};

interface BasicSketchProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const BasicSketch: React.FC<BasicSketchProps> = ({ containerRef }) => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sketchRef.current) {
      const p5Instance = new p5((p: p5) => basicSketch(p, containerRef), sketchRef.current);
      return () => p5Instance.remove(); // Cleanup the p5 instance on component unmount
    }
  }, [containerRef]);

  return <div ref={sketchRef} style={{ width: '100%' }}></div>;
};

export default BasicSketch;
