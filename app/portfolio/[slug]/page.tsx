import { Fragment } from "react";

import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Showcase from "@/components/regions/Showcase";

import { getProjectBySlug } from "@/lib/projects";
import Main from "@/components/regions/Main";

const Project1 = ({ params }) => {
    const project = getProjectBySlug(params.slug);

    return <Fragment>
        <Showcase image={project.featuredImage} />
         <Main.Content>
         
        <Heading level={1} marginBottom={2}>{project.title}</Heading>
      
        
        {/*<Showcase.Images images={project.images} />*/}
       
        <Paragraph>{project.description}</Paragraph>
        </Main.Content>
    </Fragment>
}
export default Project1;