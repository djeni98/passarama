import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import notFoundImg from '../../assets/page-not-found.svg';

import Header from '../Header';
import Footer from '../Footer';

export default function NotFound() {
  return (
    <>
      <Header className="mb-7" />

      <Container className="mb-7">
        <Row xs={1}>
          <Col>
            <h1 className="mb-5 text-center">Página não encontrada</h1>
          </Col>
          <Col className="center">
            <img src={notFoundImg} className="img-w100" alt="Página não encontrada" />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
