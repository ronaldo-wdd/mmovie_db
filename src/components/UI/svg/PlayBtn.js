import React from 'react';
import classes from './PlayBtn.module.css';


const PlayBtn = props => {
    let svgClasses = [props.className, classes.PlayBtn];
    props.loading && svgClasses.push(classes.Loading);
    
    return (
        <div id="PlayBtn" className={svgClasses.join(' ')} 
            onClick={props.click} >
            <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 224.88 257.73">
                <defs>
                    <clipPath id="clip-path" transform="translate(-571.63 -255.64)">
                    <polygon className={classes.Cls1} points="795 384 572 513 572 256 795 384 795 384"/>
                    </clipPath>
                </defs>

                <g id="playBtn-2" data-name="playBtn">
                    <g className={classes.Cls2}>
                        <rect className={classes.Cls3} width="223" height="257"/>
                        <rect className={classes.Cls4} width="130" height="257"/>
                        <rect className={classes.Cls5} width="67" height="257"/>
                    </g>
                </g>
                <polygon id="triangle" className={classes.Cls6} points="223.87 127.86 0.87 256.86 0.87 0.86 223.87 127.86 223.87 127.86"/>
            </svg>
            <p>{ props.error ? 'Trailer not found! :(' : 'Play Trailer' }</p>
        </div>
    );
}

export default PlayBtn;