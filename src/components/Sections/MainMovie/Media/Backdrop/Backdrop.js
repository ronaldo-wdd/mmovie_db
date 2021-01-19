import React from 'react';
import classes from './Backdrop.module.css';
import Col from 'react-bootstrap/Col';

import backdropImg from '../../../../../assents/images/backdrop.jpg';


const Backdrop = () => {
    return (
        <div className={classes.Carousel} >
            <Col md='10' 
                className={classes.Backdrop}
                style={{
                    // background: `url(${mainImage}) no-repeat center`,
                    backgroundImage: `url(${backdropImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top',
                    backgroundSize: 'cover'
                }} />
            <Col md="5"
                className={classes.NextBackdrop}
                />
            <Col md="4"
                className={classes.FakeBackdrop}
                />
        </div>
    );
}

export default Backdrop;