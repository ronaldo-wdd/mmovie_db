import classes from "./Modal.module.css";
import React from 'react';
import Col from "react-bootstrap/Col";
import Youtube from 'react-youtube';

const Modal = props => {
    const opts = {
        playerVars: {
            autoplay: 1
        }},
        onReady = event => {
            event.target.playVideo();
        }

    return (
        <div className={classes.Modal}
            onClick={()=> props.click()} >
            <Col md="8">
                <Youtube videoId={props.id}
                    className={classes.Youtube}  
                    opts={opts}
                    onReady={event => onReady(event)} />
            </Col>  
        </div>
    );
}

export default Modal;