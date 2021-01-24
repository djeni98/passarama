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
