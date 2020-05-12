import React from 'react';

import './styles.css';

import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Container fluid className="footer">
      <Row className="align-items-center navbar-dark" xs={1} md={2}>
        <Col className="d-flex justify-content-center">
          <NavLink exact to="/" className="nav-link text-white">
            <h2 className="logo-font">Passarama</h2>
          </NavLink>
        </Col>
        <Col className="d-block d-md-none">
          <hr />
        </Col>
        <Col className="navbar-nav align-items-center">
          <NavLink className="nav-link" exact to="/">Início</NavLink>
          <NavLink className="nav-link" to="/search">Pesquisar</NavLink>
          <NavLink className="nav-link" to="/fansubs">Fansubs</NavLink>
          <NavLink className="nav-link" to="/about">Sobre</NavLink>
        </Col>
      </Row>
    </Container>
  );
}
