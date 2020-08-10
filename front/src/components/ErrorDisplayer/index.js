import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

function ErrorDisplayer(props) {
  const { msg, img, alt } = props;

  return (
    <Container className="mb-7">
      <Row xs={1}>
        <Col>
          <h2 className="mb-5 text-center">{msg}</h2>
        </Col>
        <Col className="center">
          <img src={img} className="img-w100" alt={alt} />
        </Col>
      </Row>
    </Container>
  );
}

ErrorDisplayer.propTypes = {
  msg: PropTypes.string,
  img: PropTypes.node,
  alt: PropTypes.string,
}

ErrorDisplayer.defaultProps = {
  msg: 'Erro',
  img: null,
  alt: 'Erro',
}

export default ErrorDisplayer;
