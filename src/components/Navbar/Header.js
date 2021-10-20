import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";


export default function Header({loggedIn, handleLogout, user}){

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Link to="/" className="navbar-brand">TreeVis</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Link className="nav-link" to="/bst">BST</Link>
                <Link className="nav-link" to="/avl">AVL</Link>
                <Link className="nav-link" to="/red-black">Red-Black</Link>
                </Nav>
                <Nav>
                
                {loggedIn ? 
                <><NavDropdown title={user ? user.username : "User"} id="collasible-nav-dropdown">
                <LinkContainer to="/savedTrees">
                    <NavDropdown.Item>Trees</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/account">
                    <NavDropdown.Item>Account</NavDropdown.Item>
                </LinkContainer>
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