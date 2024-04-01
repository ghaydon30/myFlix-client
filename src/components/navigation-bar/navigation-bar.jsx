import { Navbar, Container, Nav } from "react-bootstrap";

// Link component creates links between different views 
// Link component ensures that the application doesn't do a full-page reload when navigating between views
import { Link } from "react-router-dom";

import '../../index.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className='custom-navbar' expand='lg'>
    {/* bg='light' */}
      <Container>
        <Navbar.Brand className='custom-title_navlink' style={{fontSize: '40px'}} as={Link} to='/'>
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {!user && (
              <>
                <Nav.Link as={Link} className='custom-standard_navlink' style={{fontSize: '24px'}} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} className='custom-standard_navlink' style={{fontSize: '24px'}} to='/signup'>
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} className='custom-standard_navlink' style={{fontSize: '24px'}} to='/'>Home</Nav.Link>
                <Nav.Link className='custom-standard_navlink' style={{fontSize: '24px'}} onClick={onLoggedOut}>Logout</Nav.Link>
                <Nav.Link className='custom-standard_navlink' style={{fontSize: '24px'}} as={Link} to='/profile'>Profile</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};