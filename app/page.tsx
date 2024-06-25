"use client";

import { Fragment, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import p5 from 'p5';

import Heading from '../components/html/Heading';
import Main from '../components/regions/Main';
import Paragraph from '../components/html/Paragraph';
import Showcase from '../components/regions/Showcase';

// Define a type for the dynamically imported module
type SketchModule = {
  default: (p: p5) => void;
};

// Dynamically import the sketch function with the correct type

//const DynamicBasicSketch = dynamic(() => import('../sketches/BasicSketch'), { ssr: false });
const DynamicTriangesSketch = dynamic(() => import('../sketches/TriangleSketch'), { ssr: false });



const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      <div ref={containerRef} style={{ aspectRatio: "16 / 7"}}>
        <DynamicTriangesSketch containerRef={containerRef} />
      </div>
      <Paragraph type="caption">&quot;Triangle Nodes&quot; - Generative art illustration created for the Newhouse Network Spring 2024 magazine. Refresh the page for a new composition.</Paragraph>
      <Main.Content>
        <Heading level={1} marginBottom={2}>Art. Design. Code.</Heading>
        <Paragraph>
          I am a creative professional at the intersection of art, design, and code. Profoundly inspired by Dan Shiffman&apos;s &quot;The Nature of Code&quot;, I have delved deeper into the realm of algorithmic principles, fueling complex visual and interactive experiences. This influential book has not only sharpened my technical skills but also broadened my perspective, enabling me to integrate natural systems into my digital work. My journey through generative art has evolved into harnessing code in ways that echo the elegance and complexity of the natural world. This pursuit continually pushes my boundaries of traditional design and art in every project, from graphic design to website design to motion design.
        </Paragraph>
      </Main.Content>
    </Fragment>
  );
}

export default Home;
