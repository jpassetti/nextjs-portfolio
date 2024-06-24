import Heading from '../../components/html/Heading';
import Main from '../../components/regions/Main';
import Paragraph from '../../components/html/Paragraph';

const AboutPage = () => {
  return (
    <Main.Content>
      <Heading level={1} marginBottom={2}>About</Heading>
      <Paragraph>Jeff Passetti merges design with programming, crafting user experiences at the intersection of art, design and code. With expertise in leading-edge tools like Adobe XD, Sketch, Figma, and mastery in development technologies including HTML, CSS, JavaScript, PHP, WordPress, React, and Next.js, Jeff designs and prototypes at the intersection of aesthetics and functionality. His role as a principal designer at the Newhouse School is complemented by over a decade of teaching at Syracuse University, where he empowers the next generation of designers and developers.</Paragraph> 

      <Paragraph>Jeff's recent collaborations include working with Upstate Interactive on pioneering projects in UI/UX design, and blockchain implementations, pushing the boundaries of Web3 and smart contract technologies. In 2019, he contributed to Careers in Code, a coding bootcamp in Syracuse designed to address socio-economic disparities by equipping underrepresented groups with coding skills.</Paragraph>

      <Paragraph>His innovative work on projects like Handshake Magazine, World Journalism, and News21: el Neuvo Normal has earned accolades from the Society of Professional Journalists, the Online News Association, and the Society for News Design. His digital footprint extends to impactful websites such as those commemorating the Pan-Am tragedy, The Fall Workshop, and The Field Report.</Paragraph>

      <Paragraph>Beyond his project work, Jeff has shaped the digital presence of the Newhouse School through key initiatives, designing engaging websites for events like The Fall Workshop, Pixels and Print, the Mirror Awards, and the Toner Prizes. He has redefined the school's main website and its alumni and research magazines, recently revitalizing launching a new website featuring the alumni magazine.</Paragraph>
    </Main.Content>
  );
}

export default AboutPage;