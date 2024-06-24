import { Fragment } from "react";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Showcase from "@/components/regions/Showcase";
import { getProjectBySlug } from "@/lib/projects";
import Main from "@/components/regions/Main";

interface ProjectProps {
  params: {
    slug: string;
  };
}

interface FeaturedImage {
    src: string;
    altText: string;
    mediaDetails: {
      width: number;
      height: number;
    };
  }

  interface Project {
    title: string;
    description: string;
    featuredImage: FeaturedImage;
  }

const Project1: React.FC<ProjectProps> = ({ params }) => {
  const project: Project | undefined = getProjectBySlug(params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <Fragment>
      <Showcase image={project.featuredImage} />
      <Main.Content>
        <Heading level={1} marginBottom={2}>
          {project.title}
        </Heading>
        <Paragraph>{project.description}</Paragraph>
      </Main.Content>
    </Fragment>
  );
};

export default Project1;
