interface MediaDetails {
  width: number;
  height: number;
}

interface Image {
  src: string;
  altText: string;
  mediaDetails: MediaDetails;
}

interface Span {
  col: number;
  row: number;
}

interface Project {
  title: string;
  description: string;
  featuredImage: Image;
  images: Image[];
  slug: string;
  span: Span;
}

const projects: Project[] = [
  {
    title: 'Newhouse School',
    description: 'This is project 1',
    featuredImage: {
      src: '/portfolio/01-newhouse-school.jpg',
      altText: 'Newhouse School',
      mediaDetails: {
        width: 1920,
        height: 1080
      }
    },
    images: [
      {
        src: 'https://via.placeholder.com/1600x900',
        altText: 'Placeholder Image',
        mediaDetails: {
          width: 1600,
          height: 900
        }
      },
      {
        src: 'https://via.placeholder.com/1600x900',
        altText: 'Placeholder Image',
        mediaDetails: {
          width: 1600,
          height: 900
        }
      },
      {
        src: 'https://via.placeholder.com/1600x900',
        altText: 'Placeholder Image',
        mediaDetails: {
          width: 1600,
          height: 900
        }
      }
    ],
    slug: 'project-1',
    span: {
      col: 2,
      row: 2
    }
  },
  {
    title: 'Mirror Awards',
    description: 'This is project 2',
    featuredImage: {
      src: 'https://via.placeholder.com/1600x900',
      altText: 'Placeholder Image',
      mediaDetails: {
        width: 1600,
        height: 900
      }
    },
    images: [
      {
        src: 'https://via.placeholder.com/1600x900',
        altText: 'Placeholder Image',
        mediaDetails: {
          width: 1600,
          height: 900
        }
      },
      {
        src: 'https://via.placeholder.com/1600x900',
        altText: 'Placeholder Image',
        mediaDetails: {
          width: 1600,
          height: 900
        }
      },
      {
        src: 'https://via.placeholder.com/1600x900',
        altText: 'Placeholder Image',
        mediaDetails: {
          width: 1600,
          height: 900
        }
      }
    ],
    slug: 'project-2',
    span: {
      col: 2,
      row: 2
    }
  },
  // ... other projects
];

export const getProjects = (): Project[] => {
  return projects;
}

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
}
