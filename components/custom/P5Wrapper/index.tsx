"use client"

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Wrapper = ({ sketch }) => {
  const sketchRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const p5Instance = new p5(sketch(containerRef), sketchRef.current);

    // Clean up the p5 instance on component unmount
    return () => {
      p5Instance.remove();
    };
  }, [sketch]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }}><div ref={sketchRef}></div></div>;
};

export default P5Wrapper;