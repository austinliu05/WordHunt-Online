import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const TiePopup: React.FC = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="bg-warning text-dark p-4 rounded position-relative">
                <button
                    type="button"
                    className="btn-close btn-close-white position-absolute top-0 end-0 m-2"
                    onClick={handleClose}
                    aria-label="Close"
                ></button>

                <div className="text-center">
                    <h2 className="fw-bold mb-3">It's a Tie!</h2>
                    <p>Neither player won. Try again!</p>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default TiePopup;
