import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDeletePostContext } from './deletePost';

export const DeletePostConfirm = () => {

    const {deletePost, show, handleClose, handleShow} = useDeletePostContext();
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" centered>
            <Modal.Header>
            <Modal.Title>Confirm Delete Post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure you want to delete this post!</p>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>Delete</Button>
            <Button variant="dark" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}