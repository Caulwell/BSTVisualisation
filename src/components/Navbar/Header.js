import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Header({loggedIn, handleLogout}){




    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Link to="/" className="navbar-brand">TreeVis</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Link className="nav-link" to="/BST">BST</Link>
                <Link className="nav-link" to="/AVL">AVL</Link>
                <Link className="nav-link" to="/Red-Black">Red-Black</Link>
                </Nav>
                <Nav>
                
                {loggedIn ? 
                <><NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <a className="nav-link" onClick={handleLogout}>Sign Out</a></>
                :
                    <><Link className="nav-link" to="/register">Register</Link><Link className="nav-link" to="/login">Login</Link></>
                }
                
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
            
            
        
        
    )
}