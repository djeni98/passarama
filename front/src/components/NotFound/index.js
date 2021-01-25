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
