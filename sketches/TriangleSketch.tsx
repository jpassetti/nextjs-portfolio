"use client";

import p5 from 'p5';
import React, { useRef, useEffect } from 'react';

interface Vector {
  x: number;
  y: number;
}

class Triangle {
  a: Vector;
  b: Vector;
  c: Vector;
  col: [number, number, number];
  opacity: number;
  originalColor: [number, number, number];

  constructor(a: Vector, b: Vector, c: Vector, col: [number, number, number], opacity: number) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.col = col;
    this.opacity = opacity;
    this.originalColor = col; // Store the original color
  }

  draw(p: p5) {
    p.fill(this.col[0], this.col[1], this.col[2], this.opacity);
    p.noStroke();
    p.triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
  }

  setColor(newColor: [number, number, number]) {
    this.col = newColor;
  }

  resetColor() {
    this.col = this.originalColor; // Reset to original color
  }

  containsPoint(px: number, py: number) {
    const sign = (p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number) => {
      return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
    };

    let d1 = sign(px, py, this.a.x, this.a.y, this.b.x, this.b.y);
    let d2 = sign(px, py, this.b.x, this.b.y, this.c.x, this.c.y);
    let d3 = sign(px, py, this.c.x, this.c.y, this.a.x, this.a.y);

    let hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
    let hasPos = d1 > 0 || d2 > 0 || d3 > 0;

    return !(hasNeg && hasPos);
  }
}

const triangleSketch = (containerRef: React.RefObject<HTMLDivElement>) => (p: p5) => {
  let minDistance = 5; // Minimum distance between dots to avoid density

  let dots: p5.Vector[] = []; // Store dot positions
  let triangles: Triangle[] = []; // Store triangles

  let attempts = 0; // To prevent infinite loops

  let showTriangles = true;

  let colors: [number, number, number][] = [
    [247, 105, 0],
    [0, 14, 84],
    [255, 67, 27],
    [255, 142, 0],
    [32, 50, 153],
    [43, 114, 215],
  ];

  const findNearestNeighbors = (dot: p5.Vector, dots: p5.Vector[], count: number, radius: number) => {
    let distances = dots
      .map((other) => {
        return {
          dot: other,
          distance: p.dist(dot.x, dot.y, other.x, other.y),
        };
      })
      .filter((d) => d.distance > 0 && d.distance <= radius) // Exclude self and limit by radius
      .sort((a, b) => a.distance - b.distance); // Sort by distance

    // Return up to 'count' nearest neighbors
    return distances.slice(0, count).map((d) => d.dot);
  };

  const originalWidth = 2000;
  const originalHeight = 500;
  let aspectRatio = originalWidth / originalHeight;

  const resizeCanvas = () => {
    let containerWidth = containerRef.current?.offsetWidth || 0;
    let containerHeight = containerRef.current?.offsetHeight || 0;

    let newWidth, newHeight;

    if (containerWidth / containerHeight > aspectRatio) {
      newHeight = containerHeight;
      newWidth = containerHeight * aspectRatio;
    } else {
      newWidth = containerWidth;
      newHeight = containerWidth / aspectRatio;
    }

    p.resizeCanvas(newWidth, newHeight);
  };

  p.setup = () => {
    p.createCanvas(2000, 400);
    p.background("#eaeaeb");

    let noiseScaleDensity = 0.001; // Controls the density variation
    let noiseScaleHeight = 0.1; // Controls the vertical range variation

    while (dots.length < 300 && attempts < 10000) {
      let x = p.random(p.width);
      let densityFactor = p.noise(x * noiseScaleDensity); // Get Perlin noise value for density

      // Adjust density based on position and noise
      if (p.random(1) > densityFactor) continue; // Skip some iterations based on density factor

      let heightFactor = p.noise(x * noiseScaleHeight); // Get Perlin noise value for height
      let minY = p.height * heightFactor * 0.5; // Minimum y based on height factor (for valleys)
      let maxY = minY + p.height * 0.5 * heightFactor; // Maximum y based on height factor (for hills)
      let y = p.random(minY, maxY);

      let dot = p.createVector(x, y);
      let tooClose = false;

      // Check if dot is too close to others
      for (let i = 0; i < dots.length; i++) {
        let d = p.dist(dot.x, dot.y, dots[i].x, dots[i].y);
        if (d < minDistance) {
          tooClose = true;
          break;
        }
      }

      // If not too close, add to dots array
      if (!tooClose) {
        dots.push(dot);
      }

      attempts++;
    }

    // Calculate and draw triangles
    for (let i = 0; i < dots.length; i++) {
      let distances = [];
      for (let j = 0; j < dots.length; j++) {
        if (i !== j) {
          // Ensure not comparing dot to itself
          let d = p.dist(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
          distances.push({ index: j, distance: d });
        }
      }

      // Sort by distance
      distances.sort((a, b) => a.distance - b.distance);

      // Select up to three closest neighbors to form triangles
      for (let n = 0; n < 3; n++) {
        let neighbor = distances[n];
        let nextNeighbor = distances[(n + 1) % distances.length]; // Wrap for continuity

        // Randomly select color and opacity
        let colorIndex = p.floor(p.random(colors.length));
        let opacity = p.random(50, 255); // Random opacity
        let col = colors[colorIndex];

        const tri = new Triangle(
          dots[i],
          dots[neighbor.index],
          dots[nextNeighbor.index],
          col,
          opacity
        );

        // Draw triangle
        triangles.push(tri);
      }
    }
    resizeCanvas();
  };

  p.draw = () => {
    // Drawing handled in setup
    p.background("#eaeaeb");

    let isMouseOver = false; // Track if the mouse is over any triangle

    // Draw all triangles and check for mouse hover
    for (let tri of triangles) {
      if (tri.containsPoint(p.mouseX, p.mouseY)) {
        isMouseOver = true;
        tri.setColor([255, 105, 180]); // Change color to pink
      } else {
        tri.resetColor(); // Reset to original color
      }
      if (showTriangles) {
        tri.draw(p);
      }
    }

    // Draw dots
    for (let i = 0; i < dots.length; i++) {
      p.fill(0);
      p.noStroke();
      p.ellipse(dots[i].x, dots[i].y, 5, 5);
    }
  };

  p.windowResized = () => {
    resizeCanvas();
  };
};

interface TriangleSketchProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const TriangleSketch: React.FC<TriangleSketchProps> = ({ containerRef }) => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sketchRef.current) {
      const p5Instance = new p5(triangleSketch(containerRef), sketchRef.current);
      return () => p5Instance.remove(); // Cleanup the p5 instance on component unmount
    }
  }, [containerRef]);

  return <div ref={sketchRef}></div>;
};

export default TriangleSketch;
