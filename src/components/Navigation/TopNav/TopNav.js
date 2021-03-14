import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './TopNav.module.css';
import { animateScroll } from 'react-scroll';

import Container from 'react-bootstrap/Container';
import Buttons from '../../UI/Buttons/Buttons';
import * as actions from '../../../store/actions';
import { scrollX, touchStart } from '../../../shared/utility';


class TopNav extends Component {
    constructor(props) {
        super(props);
        this.glRef = React.createRef();
        this.inputRef = React.createRef();
    }
    
    state = {
        years: [
            '2021', '2020', '2019', '2018', '2017', '2016',
            '2015', '2014', '2013','2012', '2011','2010'],
        filter: 0,
        filterActive: false,
        deltaX: 0,
        maxDeltaX: 0,
        touchstart: 0
    }

    componentDidMount() {
        (this.props.search && this.inputRef && !this.props.params.query)
            && this.inputRef.current.focus();
    }
    
    handleFiltersList() {
        setTimeout(() => {
            let el = this.glRef.current,
                target = el.querySelector('ul'),
                maxDeltaX = target.getBoundingClientRect().width - el.getBoundingClientRect().width;

            this.setState({maxDeltaX: maxDeltaX});
        }, 300);
    }

    handleFiltersListScroll = e => {
        const deltaX = scrollX(e, this.state.deltaX, this.state.maxDeltaX, this.state.touchstart);
        this.setState({deltaX: deltaX});
    }
    
    handleElClick (value) {
        this.state.filter === 0
            ? this.props.params.genre === value
                ? this.onSetParams({genre: undefined})
                : this.onSetParams({genre: value})
            : this.props.params.year === value
                ? this.onSetParams({year: undefined})
                : this.onSetParams({year: value});
    }

    onSetParams (param) {
        this.props.onSetParams(param);
        if (!param[Object.keys(param)[0]]) return;

        let filter = this.state.filter + 1,
            active = filter <= 1;
        filter = filter <= 1 ? filter : 0;

        this.setState({filter: filter, filterActive: active, deltaX: 0});
        this.handleApplyFilter();
    }

    handleActiveFilter () {
        !this.state.filterActive
            ? this.setState({filterActive: true, deltaX: 0})
            : this.state.filter === 0
                ? this.setState({filter: 1, deltaX: 0})
                : this.setState({filterActive: false, filter: 0, deltaX: 0});

        this.handleFiltersList();
        this.handleApplyFilter();
    }

    handleApplyFilter () {
        if ( this.state.filter === 0 ) return;

        setTimeout(()=> {
            let params = new URLSearchParams({
                genre: this.props.params.genre | '',
                year: this.props.params.year | ''
            });
            
            this.props.history.replace({
                pathname: '/movies/popular',
                search: params.toString()
            });

            this.props.onFetchMovies();
            animateScroll.scrollToTop({ smooth: true });
        }, 300);
    }


    render () {
        let filters = !this.state.filterActive
            ? Object.values(this.props.params).map((value, index) => {
                return value === undefined || index === 2
                    ? <div key={index}/> : <li key={index} >
                        {index === 0 ? this.props.genres[value] : value}</li> 
                })
            : this.state.filter === 0
                ? Object.entries(this.props.genres).map(el => {
                    return <li key={el[0]}
                        onClick={()=> this.handleElClick(el[0])}
                        className={this.props.params.genre === el[0] ? classes.Active : ""} >
                        {el[1]}</li>})
                : this.state.years.map(year =>
                    <li key={year}
                        className={this.props.params.year === year ? classes.Active : ""}
                        onClick={()=> this.handleElClick(year)} >{year}</li>),

        closeBtnClasses = [classes.Btn];
        this.state.filterActive && closeBtnClasses.push(classes.Hidden);


        return (
            <Container fluid="xxl"
                className={classes.Navigation}>
                <Buttons type="goBack"
                    className={closeBtnClasses.join(' ')}
                    click={() => this.props.history.goBack()} />

                {this.props.filter &&
                    <div className={classes.Filters}>
                        <div ref={this.glRef}
                            className={classes.FiltersList}
                            onWheel = { event => this.handleFiltersListScroll(event) }
                            onTouchStart = { event => this.setState({touchstart: touchStart(event)}) }
                            onTouchMove = { event => this.handleFiltersListScroll(event) } >
                            <ul style={{transform: `translateX(-${this.state.deltaX}px)`}} >
                                {filters}</ul>
                        </div>
                        <Buttons type="filter"
                            className={classes.Btn}
                            click={() => this.handleActiveFilter()} >
                            {!this.state.filterActive
                                ? "Filter" : this.state.filter === 0
                                    ? "Genre" : "Year"}
                        </Buttons>
                    </div>}

                {this.props.search &&
                    <form className={classes.Search} 
                        onSubmit={this.props.handleFormSubmit}>
                        <label>
                            <span className={classes.WidthMachine} >
                                {this.props.params.query || ''} </span>
                            <input type="text" 
                                ref={this.inputRef}
                                required
                                value={this.props.params.query || ''}
                                onChange={this.props.handleInputChange} />
                        </label>
                        <input type="submit" value="SEARCH" />
                    </form>}
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
        genres: state.movies.genresList,
        params: state.movies.params,
        mobile: state.navigation.mobile
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchMovies: () => dispatch(actions.fetch_movies()),
        onSetParams: param => dispatch(actions.set_params(param))
    }
};

export default connect (mapStateToProps, mapDispatchToProps)(TopNav);