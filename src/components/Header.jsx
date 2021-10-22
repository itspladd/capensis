// Router components
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import '../styles/Header.css';

export default function Header(props) {
  const { username, handleLogout, currentSession } = props;

  return(
    <Navbar className="navbar" variant="dark" expand="sm">
      <Container>
        <LinkContainer to="/"><Navbar.Brand href="/">Capensis</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/schedule"><Nav.Link>Schedule</Nav.Link></LinkContainer>
            <LinkContainer to="/projects"><Nav.Link>Projects</Nav.Link></LinkContainer>
            <LinkContainer to="/reports"><Nav.Link>Reports</Nav.Link></LinkContainer>
          </Nav>
          <Navbar.Text>
            <span className="me-2">Logged in as {username}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}