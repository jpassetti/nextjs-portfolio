import type { Metadata } from 'next'

import '../sass/global.scss';

import Col from '../components/layout/Col';
import Header from '../components/regions/Header';
import Main from '../components/regions/Main';
import Footer from '../components/regions/Footer';
import Row from '../components/layout/Row';


export const metadata: Metadata = {
  title: 'Portfolio | Jeff Passetti',
  description: 'Description goes here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://use.typekit.net/dlm5kjq.css" />
      </head>
      <body>
        <Row>
          <Col xs={12} md={3} lg={3}>
        <Header />
        </Col>
        <Col xs={12} md={9} lg={9}>
        <Main>
          {children}
        </Main>
        </Col>
        </Row>
        </body>
    </html>
  )
}
