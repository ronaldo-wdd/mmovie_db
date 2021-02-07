import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export const backdropGsap = element => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            scrub: true,
            start: 0,
            end: 'bottom 10%'
        }});
    tl.to(element.querySelector('#after'), {
        backgroundImage: 'linear-gradient(#1d1d1be3 10%, #1d1d1b)'
    });
}

// 
export const gsapAnim = selector => {
    let 
        // backdropEl = selector.querySelector('#backdrop'),
        infoEl = selector.querySelector('#info'),
        moviesListEl = selector.querySelector('#moviesList'),
        moviesRow = moviesListEl.querySelector('.moviesRow'),
        moviesListTw = gsap.to(moviesRow, { paused: true }),
        infoTw = gsap.to(infoEl, { paused: true }),
        xMax = moviesRow.scrollWidth - moviesRow.clientWidth * 1.05,
        startPin = 'bottom bottom-=15px',
        // backdropST = ScrollTrigger.create({
        //     id: 'bp',
        //     scrub: true,
        //     start: 0,
        //     end: 'bottom 10%' }),
        infoST1 = ScrollTrigger.create({
            id: 'info_pin',
            trigger: moviesListEl,
            pin: infoEl,
            pinSpacing: false,
            start: ()=> startPin,
            end: 'bottom+=200% top',
            onRefresh: self => {
                let start = window.innerWidth < 768
                    ? 'bottom bottom-=15px'
                    : 0;
                infoST1Refresh(start, self); }
        }),
        infoST2 = ScrollTrigger.create({
            id: 'info_y',
            trigger: moviesListEl,
            start: 0,
            end: 'bottom bottom-=15px',
            onUpdate: () => {
                infoTw.vars.y = -window.scrollY/2;
                infoTw.invalidate().restart() }
        }),
        infoST3 = ScrollTrigger.create({
            id: 'info_opacity',
            trigger: moviesListEl,
            start: 0,
            end: '+=250',
            onEnter: () => {
                infoTw.vars.opacity = 1;
                infoTw.invalidate().restart();
            },
            onUpdate: self => {
                infoTw.vars.opacity = -self.progress + 1;
                infoTw.invalidate().restart();
            // console.log(infoTw.vars.opacity)
            }
        }),
        moviesListST = ScrollTrigger.create({
            id: 'ml',
            trigger: moviesListEl,
            pin: moviesListEl,
            start: 'bottom bottom-=15px',
            end: xMax,
            onUpdate: self => {
                moviesListTw.vars.x = self.progress.toFixed(3) * -xMax;
                moviesListTw.invalidate().restart(); }
        });

    function infoST1Refresh (start, st) {
        if (start !== startPin) {
            startPin = start;
            st.refresh();
        }
    }

        
    return { moviesListST: moviesListST, 
        infoST: { 
            opacity: infoST3,
            y: infoST2,
            pin: infoST1
        }
    }
}