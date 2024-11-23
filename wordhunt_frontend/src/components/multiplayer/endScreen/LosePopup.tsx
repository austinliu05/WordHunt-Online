import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const LosePopup: React.FC = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="bg-danger text-white p-4 rounded position-relative">
                <button
                    type="button"
                    className="btn-close btn-close-white position-absolute top-0 end-0 m-2"
                    onClick={handleClose}
                    aria-label="Close"
                ></button>

                <div className="text-center">
                    <h2 className="fw-bold mb-3">Oh Noes!</h2>
                    <p>You have lost. Try again next time!</p>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LosePopup;
