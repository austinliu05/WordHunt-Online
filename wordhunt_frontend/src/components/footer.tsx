import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-light py-2">
            <Container>
                <Row className="d-flex justify-content-between align-items-center text-center">
                    <Col md="4" className="mb-2 mb-md-0 py-4">
                        <h6>Contact</h6>
                        <p className="mb-0">
                            Email: <a href="mailto:austin_f_liu@brown.edu" className="text-light">austin_f_liu@brown.edu</a>
                        </p>
                    </Col>

                    <Col md="4" className="mb-2 mb-md-0">
                        <p className="mb-0">Version: 3.0.5</p>
                    </Col>

                    <Col md="4">
                        <p className="mb-0">&copy; 2024 Austin Liu. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
