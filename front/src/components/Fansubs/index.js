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

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

import api from '../api';
import { getMessageAndImageFromError } from '../utils';

import noResultsImg from '../../assets/no-results.svg';

import Header from '../Header';
import Footer from '../Footer';
import ErrorDisplayer from '../ErrorDisplayer';

export default function Fansubs() {
  const [fansubs, setFansubs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState(null);

  // Get More Results
  useEffect(() => {
    setLoadingMore(true);

    const params = { limit: 10, offset }
    api.get('fansubs', { params })
      .then(response => {
        const totalCount = response.data.total;
        const results = response.data.results;

        setFansubs(prevFansubs => [...prevFansubs, ...results]);
        setTotal(totalCount);

        setError(null);
        setLoading(false);
        setLoadingMore(false);
      }).catch(error => {
        setError(getMessageAndImageFromError(error));

        setLoading(false);
        setLoadingMore(false);
      });
  }, [offset]);

  return (
    <>
      <Header className="mb-7" />

      <Container className="mb-3">
        <Row>
          <Col>
            <h1>Fansubs</h1>
          </Col>
        </Row>
      </Container>

      { loading ? (
        <Container className="mb-5">
          <Row>
            <Col>
              <h2 className="text-center">Carregando...</h2>
            </Col>
          </Row>
        </Container>
      ) : null }

      { total && !loading && !error ? (
        <Container className="mb-5">
          <Row className="mb-3">
            <Col>
              <h2 className="text-right">{fansubs.length} de {total} Resultado(s)</h2>
            </Col>
          </Row>
          <Row xs={1} lg={2} className="align-items-stretch mb-3">
            {fansubs.map((fansub, index) => (
                <Col key={index} className="p-15px">
                  <Card className="orange-border h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <Card.Title>{fansub.name}</Card.Title>
                        <Card.Link href={fansub.facebook} target="_blank">
                        <h5>
                          <i className="fa fa-facebook-square"></i>
                          <span className="sr-only">Facebook</span>
                        </h5>
                        </Card.Link>
                      </div>
                      <Card.Link href={fansub.link} target="_blank">{fansub.link}</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          </Row>
          { fansubs.length < total ? (
            <Row>
              <Col
                xs={{span: 10, offset: 1}}
                md={{span: 8, offset: 2}}
                lg={{span: 6, offset: 3}}
              >
                <button className="chip" onClick={() => setOffset(offset+10)}>
                  { loadingMore ? (
                    <Spinner
                      as="span" animation="border"
                      aria-hidden="true" size="sm"
                      variant="light" role="status"
                    >
                      <span className="sr-only">Carregando...</span>
                    </Spinner>
                  ) : 'Mais Resultados' }
                </button>
              </Col>
            </Row>
          ) : null }
        </Container>
      ) : null }

      { !total && !loading && !error ? (
        <Container className="mb-7">
          <Row xs={1}>
            <Col>
              <h2 className="mb-5 text-center">Nenhum resultado foi encontrado</h2>
            </Col>
            <Col className="center">
              <img src={noResultsImg} className="img-w100" alt="Nenhum resultado encontrado"/>
            </Col>
          </Row>
        </Container>
      ) : null }

      { error && !loading ? <ErrorDisplayer {...error} /> : null }

      <Footer />
    </>
  );
}
