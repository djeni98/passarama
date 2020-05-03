import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Container, Row, Col, Card } from 'react-bootstrap';

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

  function getDorama(value, mais = false) {
    let params =  { limit: 20 };
    if (mais) {
      params.offset = offset + 20
    }
    if (value) {
      params.title = value
    }

    setSearchValue(value);
    api.get('doramas', { params })
      .then(response => {
        if (mais) {
          setDoramas([...doramas, ...response.data]);
          setOffset(offset + 20);
        } else {
          setDoramas(response.data);
          setTotal(response.headers['x-total-count']);
          setNoResults(!response.headers['x-total-count']);
        }
      })
  }

  const location = useLocation();
  const query = location.state;

  useEffect(() => {
    if (query !== undefined) {
      getDorama(query);
    }
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

      { total ? (
        <Container className="mb-5">
          <Row className="mb-3">
            <Col>
              <h2 className="text-right">{total} Resultado(s)</h2>
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
                  Mais Resultados
                </button>
              </Col>
            </Row>
          ) : null }
        </Container>
      ) : null }

      { noResults ? (
        <Container className="mb-5">
          <Row className="justify-content-center">
            <h1>Nenhum resultado foi encontrado</h1>
          </Row>
        </Container>
      ) : null }

      <Footer />
    </>
  );
}
