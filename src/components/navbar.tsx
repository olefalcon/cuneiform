import {Link} from 'react-router-dom';
import {auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth';
import {useState, useEffect} from 'react';

//React bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
                <Nav.Link className='nav-item'><Link to='/'>Home</Link></Nav.Link>
                {!user && <Nav.Link><Link to='/register'>Register</Link></Nav.Link>}
                {!user && <Nav.Link><Link to='/login'>Login</Link></Nav.Link>}
                {user && <Navbar.Text><span>{user?.displayName}</span></Navbar.Text>}
                {user && <Nav.Link><button onClick={signUserOut}>Sign Out</button></Nav.Link>}
            </Nav>
        </Container>
    </Navbar>;
}