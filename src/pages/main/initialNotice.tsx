import { Button, Modal } from 'react-bootstrap';
import {useState} from 'react';

export const InitialNotice = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" centered>
            <Modal.Header>
            <Modal.Title>Notice</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <p>This is public to anyone. I may have shared this application with friends who could have shared it with their friends and etc. Be warned there may be inappropriate or silly posts and they shouldn't reflect my beliefs or values.</p>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>I understand.</Button>
            </Modal.Footer>
        </Modal>
    );
}