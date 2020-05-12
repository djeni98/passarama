import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

import noResultsImg from '../../assets/no-results.svg';

import api from '../api';
import SearchBar from '../SearchBar';

import Footer from '../Footer';

import './styles.css';

export default function SearchPage () {
  const [doramas, setDoramas] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const [searchValue, setSearchValue] = useState('');
  const [noResults, setNoResults] = useState(false);

  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  function getDorama(value, more = false) {
    if (loading || loadingMore) { return; }
    const funct = more ? setLoadingMore : setLoading;
    funct(true)

    let params =  { limit: 20 };
    if (more) {
      params.offset = offset + 20
    }
    if (value) {
      params.title = value
    }

    setSearchValue(value);
    api.get('doramas', { params })
      .then(response => {
        if (more) {
          setDoramas([...doramas, ...response.data]);
          setOffset(offset + 20);
        } else {
          setDoramas(response.data);
          setTotal(response.headers['x-total-count']);
          setNoResults(!response.headers['x-total-count']);
        }

        funct(false);
      })
  }

  const location = useLocation();
  const query = location.state;

  useEffect(() => {
    if (query !== undefined) {
      getDorama(query);
    }
  // eslint-disable-next-line
  }, [query]);

  return (
    <>
      <Container fluid className="header-search mb-5">
        <Row>
          <Col />
          <Col sm={10} md={8}>
            <SearchBar value={query} runFunction={getDorama} />
          </Col>
          <Col />
        </Row>
      </Container>

      { loading ? (
        <Container>
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
              <h2 className="text-right">{doramas.length} de {total} Resultado(s)</h2>
            </Col>
          </Row>
          <Row xs={1} md={2} lg={3} xl={4} className="align-items-stretch mb-3">
            {doramas.map((dorama, index) => (
                <Col key={index} className="p-15px">
                  <Card className="orange-border h-100">
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Link href={dorama.link} target="_blank">
                        <Card.Title>{dorama.title}</Card.Title>
                      </Card.Link>
                      <Card.Text>{dorama.fansub}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          </Row>
          { doramas.length < total ? (
            <Row>
              <Col
                xs={{span: 10, offset: 1}}
                md={{span: 8, offset: 2}}
                lg={{span: 6, offset: 3}}
              >
                <button className="chip" onClick={() => getDorama(searchValue, true)}>
                  { loadingMore ? (
                    <Spinner
                      as="span" animation="border"
                      aria-hidden="true" size="sm"
                      variant="light" role="status"
                    />
                  ) : 'Mais Resultados' }
                </button>
              </Col>
            </Row>
          ) : null }
        </Container>
      ) : null }

      { noResults && !loading ? (
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

      <Footer />
    </>
  );
}
