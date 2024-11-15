import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-light py-3">
            <Container>
                <Row className="text-center">
                    <Col className="m-3">
                        <h5>Contact</h5>
                        <p>
                            Email: <a href="mailto:austin_f_liu@brown.edu" className="text-light">austin_f_liu@brown.edu</a>
                        </p>
                    </Col>
                </Row>
                
                <Row className="text-center m-3">
                    <Col>
                        <p className="mb-0">Version: 1.1.2</p>
                    </Col>
                </Row>

                <Row className="text-center m-3">
                    <Col>
                        <p className="mb-0">&copy; 2024 Austin Liu. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
