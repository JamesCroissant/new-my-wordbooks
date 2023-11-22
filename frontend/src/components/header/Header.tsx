import React, { useContext, useState } from 'react';
import "./Topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthAction } from '../../store/AuthActions';
import { Navbar, Nav, NavLink } from 'react-bootstrap';

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' } as AuthAction);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/main">{state.user?.username}'s WORDBOOKS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/main/users">Profile</Nav.Link>
          <Nav.Link as={Link} to="/main/words">Wordlist</Nav.Link>
          <Nav.Link as={Link} to="/" onClick={handleLogout}>
            {state.user ? 'Logout' : 'Login'}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header