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

import React, { useEffect } from 'react';

import api from '../api';

import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import logoImg from '../../assets/passarinho.svg';
import procurarImg from '../../assets/procurar.svg';

import './styles.css';

import Header from '../Header';
import SearchBar from '../SearchBar';
import Footer from '../Footer';

export default function Home() {
  const history = useHistory();

  function navigateToSearch(searchValue) {
    history.push(`/search?title=${searchValue}`);
  }

  // Ping
  useEffect(() => { api.get('').then(() => {}).catch(() => {}) }, []);

  return (
    <>
      <Header hideLogo className="d-none d-md-block" />

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
            <SearchBar callback={navigateToSearch} />
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
