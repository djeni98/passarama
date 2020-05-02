import React from 'react';

import './styles.css';

import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <Container fluid className="footer">
      <Row className="align-items-center">
        <Col className="d-flex justify-content-center">
          <h2 className="logo-font">Passarama</h2>
        </Col>
      </Row>
    </Container>
  );
}
