import React from 'react';
import Container from 'react-bootstrap/esm/Container';

const SiteFooter = () => {
    return (
        <footer className='py-5 my-5'>
            <Container className='px-4'>
                <p className='text-center'>&copy; Ingenieria Creativa 2024</p>
            </Container>
        </footer>
    );
};

export default SiteFooter;