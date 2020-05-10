import React from 'react';

import './styles.css';

import logoImg from '../../assets/passarinho.svg';
import procurarImg from '../../assets/procurar.svg';

import { Container, Row, Col } from 'react-bootstrap';

import SearchBar from '../SearchBar';
import Footer from '../Footer';

export default function Home() {
  return (
    <>
      <Container fluid className="header-main mb-7">
        <Row>
          <Col xs={12} sm={1} md={2}/>
          <Col >
            <h1 className="logo-font">Passarama</h1>
          </Col>
          <Col className="d-flex justify-content-end align-items-end">
            <img
              className="logo-image"
              src={logoImg}
              alt="Logo - Passarama"
            />
          </Col>
          <Col xs={12} sm={1} md={2}/>
        </Row>
        <Row>
          <Col />
          <Col sm={10} md={8}>
            <SearchBar />
          </Col>
          <Col />
        </Row>
      </Container>

      <Container className="mb-7">
        <Row>
          <Col className="mb-5 max-width">
            <h1 className="mb-5 font-weight-bold">Procure doramas e ache as fansubs</h1>
            <h3>Vá para a fansub certa, sem gastar tempo procurando seus doramas</h3>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <img
              height={175}
              src={procurarImg}
              alt="Procurar"
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  )
}
