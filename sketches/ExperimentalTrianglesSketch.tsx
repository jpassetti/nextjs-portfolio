"use client";

import p5 from 'p5';
import React, { useRef, useEffect } from 'react';

interface Vector {
  x: number;
  y: number;
}

class Triangle {
  a: { pos: p5.Vector };
  b: { pos: p5.Vector };
  c: { pos: p5.Vector };
  col: [number, number, number];
  opacity: number;
  originalColor: [number, number, number];

  constructor(a: { pos: p5.Vector }, b: { pos: p5.Vector }, c: { pos: p5.Vector }, col: [number, number, number], opacity: number) {
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
    p.triangle(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y, this.c.pos.x, this.c.pos.y);
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

    let d1 = sign(px, py, this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
    let d2 = sign(px, py, this.b.pos.x, this.b.pos.y, this.c.pos.x, this.c.pos.y);
    let d3 = sign(px, py, this.c.pos.x, this.c.pos.y, this.a.pos.x, this.a.pos.y);

    let hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
    let hasPos = d1 > 0 || d2 > 0 || d3 > 0;

    return !(hasNeg && hasPos);
  }
}

const triangleSketch = (containerRef: React.RefObject<HTMLDivElement>) => (p: p5) => {
  const minDistance = 10; // Minimum distance between dots to avoid density
  const dotAnimationDuration = 5000; // Animation duration in milliseconds
  const oscillationSpeed = 2000; // Oscillation speed (higher value means slower oscillation)
  const oscillationDistance = 10; // Maximum distance dots travel from their final position during oscillation

  let dots: { pos: p5.Vector; target: p5.Vector; opacity: number; offset: p5.Vector; reached: boolean }[] = []; // Store dot positions, target positions, opacity, offset for oscillation, and if they reached their destination
  let triangles: Triangle[] = []; // Store triangles

  let attempts = 0; // To prevent infinite loops

  let showTriangles = false; // Start with triangles hidden

  let colors: [number, number, number][] = [
    [247, 105, 0],
    [0, 14, 84],
    [255, 67, 27],
    [255, 142, 0],
    [32, 50, 153],
    [43, 114, 215],
  ];

  let startTime: number;
  let triangleStartTime: number;

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

  const resizeCanvas = () => {
    let containerWidth = containerRef.current?.offsetWidth || 0;
    let containerHeight = containerRef.current?.offsetHeight || 0;

    p.resizeCanvas(containerWidth, containerHeight);
  };

  p.setup = () => {
    const containerWidth = containerRef.current?.offsetWidth || 2000;
    const containerHeight = containerRef.current?.offsetHeight || 400;
    p.createCanvas(containerWidth, containerHeight);
    p.background("#eaeaeb");

    let noiseScaleDensity = 0.5; // Controls the density variation
    let noiseScaleHeight = 0.5; // Controls the vertical range variation

    while (dots.length < 150 && attempts < 10000) {
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
        let d = p.dist(dot.x, dot.y, dots[i].target.x, dots[i].target.y);
        if (d < minDistance) {
          tooClose = true;
          break;
        }
      }

      // If not too close, add to dots array
      if (!tooClose) {
        // Start dots at a random location with 0% opacity
        dots.push({
          pos: p.createVector(p.random(p.width), p.random(p.height)),
          target: dot,
          opacity: 0,
          offset: p.createVector(p.random(-10, 10), p.random(-10, 10)), // Random initial offset for oscillation
          reached: false // Initially not reached the final position
        });
      }

      attempts++;
    }

    // Sort dots by x-coordinate
    dots.sort((a, b) => a.target.x - b.target.x);

    startTime = p.millis();

    // Calculate triangles based on final positions
    for (let i = 0; i < dots.length; i++) {
      let distances = [];
      for (let j = 0; j < dots.length; j++) {
        if (i !== j) {
          // Ensure not comparing dot to itself
          let d = p.dist(dots[i].target.x, dots[i].target.y, dots[j].target.x, dots[j].target.y);
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

        triangles.push(tri);
      }
    }

    resizeCanvas();
  };

  p.draw = () => {
    p.background("#eaeaeb");

    const elapsedTime = p.millis() - startTime;

    // Animate dots to their final positions
    for (let i = 0; i < dots.length; i++) {
      if (!dots[i].reached && elapsedTime > (i / dots.length) * dotAnimationDuration) {
        dots[i].pos.x = p.lerp(dots[i].pos.x, dots[i].target.x, elapsedTime / dotAnimationDuration);
        dots[i].pos.y = p.lerp(dots[i].pos.y, dots[i].target.y, elapsedTime / dotAnimationDuration);
        dots[i].opacity = p.lerp(0, 255, elapsedTime / dotAnimationDuration);

        // Check if the dot has reached its final position
        if (p.dist(dots[i].pos.x, dots[i].pos.y, dots[i].target.x, dots[i].target.y) < 1) {
          dots[i].reached = true;
        }
      }

      // Apply oscillation as soon as the dots reach their final positions
      if (dots[i].reached) {
        dots[i].pos.x = dots[i].target.x + p.sin(p.millis() / oscillationSpeed + dots[i].offset.x) * oscillationDistance;
        dots[i].pos.y = dots[i].target.y + p.sin(p.millis() / oscillationSpeed + dots[i].offset.y) * oscillationDistance;
      }
    }

    // Draw dots
    for (let i = 0; i < dots.length; i++) {
      p.fill(0, 0, 0, dots[i].opacity);
      p.noStroke();
      p.ellipse(dots[i].pos.x, dots[i].pos.y, 5, 5);
    }

    // Check if all dots have reached their final positions and start triangle animation
    if (!showTriangles && dots.every(dot => dot.reached)) {
      showTriangles = true;
      triangleStartTime = p.millis();
    }

    if (showTriangles) {
      const triangleElapsedTime = p.millis() - triangleStartTime;
      let trianglesToDraw = Math.min(Math.floor((triangleElapsedTime / dotAnimationDuration) * triangles.length), triangles.length);

      // Draw triangles sequentially based on elapsed time
      for (let i = 0; i < trianglesToDraw; i++) {
        triangles[i].draw(p);
      }
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

  return <div ref={sketchRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default TriangleSketch;
