import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Buscador from './Buscador';
import '../css/App.css';

function Header({ onSearch }) {
    const token = sessionStorage.getItem('token');

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>DataPelis</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="/listado">Listado</Nav.Link>
                            {token && <Nav.Link href="/favoritos">Favoritos</Nav.Link>}
                        </Nav>
                        <Buscador onSearch={onSearch} className="ms-3" />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
