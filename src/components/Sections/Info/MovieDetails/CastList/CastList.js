import classes from './CastList.module.css';
import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../../../../hoc/Auxilliary/Auxilliary';
import defaultProfilePath from '../../../../../assents/images/profile.jpg';
import { touchStart } from '../../../../../shared/utility';


const CastList = props => {
    if (props.cast.length === 0) return <div />;
    
    const castList = props.cast.map((cast, key) => {
        return (
            <div className={classes.Cast} key={key} >
                <img alt={cast.name}
                    src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                    onError={ e => e.target.src=defaultProfilePath } />
                <p>{cast.name}</p>
            </div> )
    });

    return (
        <Aux>
            <h2>Top Cast</h2>
            <div className={classes.CastList} id="castList"
                onWheel = { event => props.handleScroll(event, true) }
                onTouchStart = { event => props.onTouchStart(touchStart(event)) }
                onTouchMove = { event => props.handleScroll(event, true) }
                style={{transform: `translateX(-${props.deltaX}px)`}} >
                {castList}
            </div>
        </Aux>
    );
}


const mapStateToProps = state => {
    return {
        cast: state.movies.activeMovieCast
    }
}

export default connect(mapStateToProps)(CastList);