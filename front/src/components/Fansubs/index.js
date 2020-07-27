import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

import api from '../api';

import Header from '../Header';
import Footer from '../Footer';

export default function Fansubs() {
  const [fansubs, setFansubs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Get More Results
  useEffect(() => {
    setLoadingMore(true);

    const params = { limit: 10, offset }
    api.get('fansubs', { params })
      .then(response => {
        setFansubs(prevFansubs => [...prevFansubs, ...response.data]);
        setTotal(response.headers['x-total-count']);

        setLoading(false);
        setLoadingMore(false);
      }).catch(error => {
        console.error(error);

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

      { total && !loading ? (
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
                        <h5><i className="fa fa-facebook-square"></i></h5>
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

      <Footer />
    </>
  );
}
