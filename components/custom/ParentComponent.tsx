"use client";

// ParentComponent.tsx (or wherever you want to use TriangleSketch)
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';

const DynamicTriangleSketch = dynamic(() => import('../../sketches/TriangleSketch'), { ssr: false });

const ParentComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <DynamicTriangleSketch containerRef={containerRef} />
    </div>
  );
};

export default ParentComponent;
