/* Passarama - Find doramas and brazilian fansubs.
 * Copyright (C) 2021 Djenifer R Pereira <djeniferrenata@yahoo.com.br>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';

import './styles.css';

import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Container fluid className="footer" as="footer">
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
