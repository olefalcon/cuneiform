import {Link} from 'react-router-dom';
import {auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth';
import {useState, useEffect} from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export const NavbarComponent = () => {
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
    }, [user, loading]);

    const signUserOut = async () => {
        await signOut(auth);
    }

    return <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
                <Navbar.Brand>Cuneiform</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav variant='underline' className='me-auto'>
                        <LinkContainer to='/'><Nav.Link>Feed</Nav.Link></LinkContainer>
                        {!user && <LinkContainer to='/register'><Nav.Link>Register</Nav.Link></LinkContainer>}
                        {!user && <LinkContainer to='/login'><Nav.Link>Login</Nav.Link></LinkContainer>}
                        {user && <Nav.Link onClick={signUserOut}>Sign Out</Nav.Link>}
                    </Nav>
                    <Nav>
                        {user && <Navbar.Text>{user?.displayName}</Navbar.Text>}
                    </Nav>
                </Navbar.Collapse>
        </Container>
    </Navbar>;
}