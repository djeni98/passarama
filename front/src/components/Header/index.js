import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

import logoImg from '../../assets/passarinho.svg';

import './styles.css';

function Header(props) {
  let className = props.className || '';
  className += " bg-yellow"
  className = className.trim();

  return (
    <Container fluid className={className} >
      <Navbar expand="md" className="container">
        <NavLink exact to="/">
          <Navbar.Brand>
            <img
              height={50}
              src={logoImg}
              alt="Logo - Passarama"
            />
          </Navbar.Brand>
        </NavLink>

        <Navbar.Collapse id="navbar-id">
          <Nav className="ml-auto">
            <NavLink className="nav-link" exact to="/">Início</NavLink>
            <NavLink className="nav-link" to="/search">Pesquisar</NavLink>
            <NavLink className="nav-link" to="/fansubs">Fansubs</NavLink>
            <NavLink className="nav-link" to="/about">Sobre</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

Header.propTypes = {
  className: PropTypes.string,
}

Header.defaultProps = {
  className: '',
}

export default Header;
