import { Fragment } from 'react'



import Heading from '../components/html/Heading';
import Main from '../components/regions/Main';
import Paragraph from '../components/html/Paragraph';
//import ParentComponent from '../components/custom/ParentComponent';
import Showcase from '../components/regions/Showcase';


export default function Home() {
  return <Fragment>
   <Showcase 
    //sketch={ParentComponent}
    sketch={true}
    caption={`"Triangle nodes" - Generative artwork produced for the Newhouse Network Spring 2024 magazine. Refresh the page for a new composition.`}
    image={{
      src: 'https://via.placeholder.com/1600x900',
      altText: 'Placeholder Image',
      mediaDetails: {
        width: 1600,
        height: 900
      }
    }} />
    
    
    <Main.Content>
    <Heading level={1} marginBottom={2}>Art. Design. Code.</Heading>
    <Paragraph>I am a creative professional at the intersection of art, design, and code. Profoundly inspired by Dan Shiffman&apos;s &quot;The Nature of Code&quot;, I have delved deeper into the realm of algorithmic principles, fueling complex visual and interactive experiences. This influential book has not only sharpened my technical skills but also broadened my perspective, enabling me to integrate natural systems into my digital work. My journey through generative art has evolved into harnessing code in ways that echo the elegance and complexity of the natural world. This pursuit continually pushes my boundaries of traditional design and art in every project, from graphic design to website design to motion design.</Paragraph>
    </Main.Content>
    </Fragment>
    

    
}
