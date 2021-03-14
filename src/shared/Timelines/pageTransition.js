import { gsap, Power1 } from 'gsap';
import store from '../../store';


export function fadeOut(node) {
    const tl = gsap.timeline({paused: true});

    tl.to(node, .35, { autoAlpha: 0, ease: Power1.easeOut })
    tl.play();
}


export function play(node, page) {
    const pageLoaded = new Promise(resolve => {
        store.subscribe(()=> !store.getState().navigation.loading 
            && resolve())
    });

    let tl;
    
    switch(page) {
        case 'home': tl = getHomeAnimation(node); break;
        case 'movies': tl = getMoviesAnimation(node); break;
        case 'movie': tl = getMovieAnimation(node); break;
        case 'search': tl = getMoviesAnimation(node); break;
        default: tl = getMoviesAnimation(node);
    }
    
    pageLoaded.then(()=> tl.play());
}

function getHomeAnimation(node) {
    const timeline = gsap.timeline({paused: true}),
        mobile = store.getState().navigation.mobile;
    let infoVar = mobile ? {y: -30} : {x: 30};
    
    timeline
        .from(node, .5, { autoAlpha: 0, ease: Power1.easeOut }, "+=.6")
        .from(node.querySelector('#info'), .5, { ...infoVar, ease: Power1.easeOut }, '<')
        .from(node.querySelector('#moviesRow'), .5, { autoAlpha: 0, y: 50, ease: Power1.easeOut }, '-=.4');

    return timeline;
}

function getMoviesAnimation(node) {
    const timeline = gsap.timeline({paused: true})
        .from(node.querySelector('#moviesList'), .5, 
            { autoAlpha: 0, y: 30, ease: Power1.easeOut });

    return timeline;
}

function getMovieAnimation(node) {
    const timeline = gsap.timeline({paused: true})
        .from(node.querySelector('#info'), .5, 
            { autoAlpha: 0, y: 30, ease: Power1.easeOut }, '+=.4')

    return timeline;
}