import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import SearchBar from '../SearchBar';
import Footer from '../Footer';

import './styles.css';

export default function SearchPage () {
  const [doramas, setDoramas] = useState([]);

  function getDorama(value) {
    console.log('getDorama', value);
  }

  const location = useLocation();
  const query = location.state;

  useEffect(() => {
    console.log('useEffect', query);
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

      <Footer />
    </>
  );
}
