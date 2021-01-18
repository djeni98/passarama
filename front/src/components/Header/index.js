import React from 'react';
import PropTypes from 'prop-types';

import { NavLink, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';

import logoImg from '../../assets/passarinho.svg';

import './styles.css';

function Header(props) {
  let className = props.className;
  className += " bg-yellow"
  className = className.trim();

  const hideLogo = props.hideLogo;

  return (
    <Container fluid className={className} as="header">
      <Navbar expand="md" className="container">
        { hideLogo ? <div style={{height: 'calc(50px + 0.625rem)'}} /> : (
          <NavLink exact to="/">
            <Navbar.Brand>
              <img
                height={50}
                src={logoImg}
                alt="Logo - Passarama"
              />
            </Navbar.Brand>
          </NavLink>
        ) }

        <Dropdown className="d-md-none">
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>

          <Dropdown.Menu alignRight>
            <Dropdown.Item as={Link} className="nav-link" to="/">Início</Dropdown.Item>
            <Dropdown.Item as={Link} className="nav-link" to="/search">Pesquisar</Dropdown.Item>
            <Dropdown.Item as={Link} className="nav-link" to="/fansubs">Fansubs</Dropdown.Item>
            <Dropdown.Item as={Link} className="nav-link" to="/about">Sobre</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

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
  hideLogo: PropTypes.bool,
  className: PropTypes.string,
}

Header.defaultProps = {
  hideLogo: false,
  className: '',
}

export default Header;
