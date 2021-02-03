import classes from './CastList.module.css';
import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../../../../hoc/Auxilliary/Auxilliary';
import defaultProfilePath from '../../../../../assents/images/profile.jpg';


const CastList = props => {
    if (props.cast.length === 0) return <div />;
    
    const castList = props.cast.map((cast, key) => {
        return (
            <div className={classes.Cast} key={key}>
                <img 
                    src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} 
                    alt={cast.name}
                    onError={ e => e.target.src=defaultProfilePath } />
                <p>{cast.name}</p>
            </div> )
    });

    return (
        <Aux>
            <h2>Top Cast</h2>
            <div className={classes.CastList}>
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