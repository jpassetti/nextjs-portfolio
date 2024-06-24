import Grid from '../../components/layout/Grid';
import Heading from '../../components/html/Heading';
import Main from '../../components/regions/Main';

import { getProjects } from '../../lib/projects';
import Paragraph from '@/components/html/Paragraph';

const PortfolioPage = () => {
  return <Main><Main.Content>
    <Heading level={1} marginBottom={2}>Portfolio</Heading>
    <Paragraph>
      Here are some of the recent projects I have worked on. Click on a project to learn more about it.
    </Paragraph>
    </Main.Content>
    <Grid>
        {getProjects().map((project, index) => (
            <Grid.Cell 
              key={index}
              image={project.featuredImage}
              title={project.title}
              description={project.description}
              type="project"
              path={`/portfolio/${project.slug}`}
              span={project.span}
              />          
          ))
        }
      </Grid>
      </Main>
}

export default PortfolioPage;