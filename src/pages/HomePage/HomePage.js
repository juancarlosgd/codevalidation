// src/pages/HomePage.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomePage = () => {
  return (
      <Container className='px-4 py-5 h-80'>
        <Row className=' align-items-center gx-5'>
          <Col lg={8}>
            <div className='mb-5 mb-lg-0'>
              <h2 className='display-4 lh-1 mb-4' style={{ textAlign: 'start' }}>Autenticidad para sus documentos</h2>
              <h5 className='fs-2 display-6 lh-1 mb-4' style={{ textAlign: 'start' }}>Valida y verifica con confianza</h5>
              <p className='lead fw-normal text-muted mb-5' style={{ textAlign: 'justify' }}>
                Descubre la nueva era en la seguridad documental con [Nombre de tu Aplicación], la herramienta definitiva para asegurar y
                validar la autenticidad de tus documentos de manera infalible sin comprometer datos personales.
              </p>
              <div className='d-flex flex-column flex-lg-row align-items-center'>
                <button type="button" class="btn btn-outline-dark">Comienza ahora &#9654;</button>
                {/* <a className='me-lg-3 mb-4 mb-lg-0' href='#!'><img className='app-badge' src='assets/img/google-play-badge.svg' alt='...'></img></a>
              <a href='#!'><img className='app-badge' src='assets/img/app-store-badge.svg' alt='...'></img></a> */}
              </div>
            </div>
          </Col>

          <Col lg={4}>

          </Col>
        </Row>
        {/* <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row> */}
      </Container>
  )
};

export default HomePage;
