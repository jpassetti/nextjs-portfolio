interface Page {
  title: string;
  slug: string;
}

const pages: Page[] = [
  {
    title: 'Home',
    slug: '/'
  },
  {
    title: 'Portfolio',
    slug: '/portfolio'
  },
  {
    title: 'About',
    slug: '/about'
  }
];

export const getPages = (): Page[] => {
  return pages;
}
