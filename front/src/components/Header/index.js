import React from 'react';

import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

import logoImg from '../../assets/passarinho.svg';

import './styles.css';

export default function Header(props) {
  let className = props.className || '';
  className += " bg-yellow"
  className = className.trim();

  const showLogo = props.hideLogo ? false : true;
  return (
    <Container fluid className={className} >
      <Navbar expand="md" className="container">
        { showLogo ? (
          <NavLink exact to="/">
            <Navbar.Brand>
              <img
                height={50}
                src={logoImg}
                alt="Logo - Passarama"
              />
            </Navbar.Brand>
          </NavLink>
        ) : null }

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
