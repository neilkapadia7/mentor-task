import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../actions/mentorActions'

const Header = () => {
  const mentorLogin = useSelector(state => state.mentorLogin);
  const {userInfo} = mentorLogin;

  const dispatch = useDispatch();

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
              <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Expertrons</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                
                <Nav className="ml-auto">
              
                {userInfo ? (
                  <>
                    <LinkContainer to='/'exact>
                      <Nav.Link className='px-4 py-0'>Tasks</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/mentors'  >
                      <Nav.Link className='px-4 py-0'>Mentors</Nav.Link>
                    </LinkContainer>
                    <Nav.Link className='px-4 py-0' onClick={() => dispatch(logout())}>Logout</Nav.Link>
                    </>
                    ) : (
                  <>
                  <LinkContainer to='/login'  className='px-4 py-0'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register' className='px-4 py-0'>
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                    </>
                )}

                </Nav>
              </Navbar.Collapse>
              </Container>
            </Navbar>
        </header>
    )
}

export default Header
