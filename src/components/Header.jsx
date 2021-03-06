import { useContext } from 'react'

// Router components
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import '../styles/Header.css';

import Logo from '../components/Logo'

// Context
import { ReducerState, ReducerActions } from '../reducer/context'

export default function Header() {
  const state = useContext(ReducerState)
  const actions = useContext(ReducerActions)

  const handleLogout = event => {
    event.preventDefault();
    actions.auth.logout();
  }

  return(
    <Navbar className="navbar" variant="dark" expand="sm">
      <Container>
        <LinkContainer to="/schedule">
          <Navbar.Brand href="/"><Logo className="nav-logo" scale="0.75"/></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/schedule"><Nav.Link>Schedule</Nav.Link></LinkContainer>
            <LinkContainer to="/projects"><Nav.Link>Projects</Nav.Link></LinkContainer>
            <LinkContainer to="/sessions"><Nav.Link>Sessions</Nav.Link></LinkContainer>
            <LinkContainer to="/reports"><Nav.Link>Reports</Nav.Link></LinkContainer>
          </Nav>
          <Navbar.Text>
            <span className="me-2">Logged in as {state.user.username}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}