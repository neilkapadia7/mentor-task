import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3 footer-text'>
                        Expertrons. Task Submitted by <strong>Neil Kapadia</strong>. 
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
