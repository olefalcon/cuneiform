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
            <Nav className='navbar-nav m-auto'>
                <Navbar.Collapse>
                    <LinkContainer to='/'><Nav.Link className='nav-item'>Home</Nav.Link></LinkContainer>
                    {!user && <LinkContainer to='/register'><Nav.Link>Register</Nav.Link></LinkContainer>}
                    {!user && <LinkContainer to='/login'><Nav.Link>Login</Nav.Link></LinkContainer>}
                    {user && <Navbar.Text><span>{user?.displayName}</span></Navbar.Text>}
                    {user && <Nav.Link><Button variant='outline-dark' size='sm' onClick={signUserOut}>Sign Out</Button></Nav.Link>}
                </Navbar.Collapse>
            </Nav>
        </Container>
    </Navbar>;
}