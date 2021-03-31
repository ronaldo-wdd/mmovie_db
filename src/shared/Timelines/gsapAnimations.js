import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import store from '../../store';

gsap.registerPlugin(ScrollTrigger);


export const backdropGsap = element => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: element.querySelector('#Carousel'),
            scrub: true,
            start: 0,
            end: 'bottom top'
        }})
        .to(element.querySelector('#after'), {
            backgroundImage: 'linear-gradient(#1d1d1be3 10%, #1d1d1b)',
            duration: 0.5
        })
        .to(element.querySelector("#PlayBtn"), { 
            opacity: 0, 
            duration: 0.2 }, '-=0.5');

    return tl.scrollTrigger;
}
 

export const gsapAnim = selector => {
    let infoEl = selector.querySelector('#info'),
        infoBtns = infoEl.querySelectorAll('._btn'),
        moviesListEl = selector.querySelector('#moviesList'),
        moviesRow = moviesListEl.querySelector('#moviesRow'),
        moviesListTw = gsap.to(moviesRow, { paused: true }),
        infoTw = gsap.to(infoEl, { paused: true }),
        infoBtnTw = gsap.to(infoBtns, { paused: true }),
        footer = selector.querySelector('#footer'),
        xMax = moviesRow.scrollWidth - moviesRow.clientWidth * 1.05 - 20,
        mobile = store.getState().navigation.mobile,

        infoPinST = ScrollTrigger.create({
            id: 'info_pin',
            trigger: moviesListEl,
            pin: infoEl,
            pinSpacing: false,
            start: 0,
            end: ()=> 'bottom+=200% top'
        }),

        infoTransST = ScrollTrigger.create({
            id: 'info_y',
            trigger: moviesListEl,
            start: 0,
            end: () => 'bottom bottom-=15px',
            onUpdate: self => {
                const scrollProgress = self.progress.toFixed(2) * self.end;
                infoTw.vars.y = - scrollProgress / (mobile ? 2 : 8);
                infoTw.invalidate().restart() }
        }),

        infoBtnsST = ScrollTrigger.create({
            id: 'btns',
            start: 0,
            end: 100,
            onUpdate: self => {
                infoBtnTw.vars.opacity = -self.progress + 1;
                infoBtnTw.invalidate().restart();
            }
        }),
        
        moviesListST = ScrollTrigger.create({
            id: 'ml',
            trigger: moviesListEl,
            pin: moviesListEl,
            start: () => 'bottom bottom-=15px',
            end: () => xMax,
            onUpdate: self => {
                moviesListTw.vars.x = self.progress.toFixed(3) * -xMax;
                moviesListTw.invalidate().restart(); },
            onRefresh: self => {
                const newXMax = moviesRow.scrollWidth - moviesRow.clientWidth * 1.05 - 20;
                xMax = xMax !== newXMax ? newXMax : xMax;
                self.update() }
        });
    
    footerAnim(footer, moviesListEl);
    
    infoTransST.disable();
    
    return { 
        moviesListST: moviesListST, 
        infoST: { 
            y: infoTransST,
            pin: infoPinST,
            btns: infoBtnsST
        }
    }
}

const footerAnim = (footer, trigger) => {
    const el = footer.querySelectorAll('a'),
        img = footer.querySelectorAll('img'),
        p = footer.querySelectorAll('p'),
        h3 = footer.querySelectorAll('h3');

    gsap.timeline({
        paused: true,
        scrollTrigger: {
            trigger: trigger,
            scrub: true,
            start: ()=> 'bottom-=20 bottom',
            end: ()=> '+=50',
            onEnter: ()=> anim.restart()
        }})
        .from(footer, { opacity: 0, yPercent: 100 });

    const anim = gsap.timeline({repeat: -1})
        .from(h3, .5, {opacity: 0, x: -5, stagger: 5})
        .from(img, .5, {opacity: 0, zIndex: 1, stagger: 5}, '0')
        .from(p, .5, {opacity: 0, y: 5, zIndex: 1, stagger: 5}, '0')
        .add('end', '-=12')
        .to(h3, .5, {opacity: 0, x: 5, stagger: 5, delay: 6}, 'end')
        .to(img, .5, {opacity: 0, zIndex: 1, stagger: 5, delay: 6}, 'end')
        .to(p, .5, {opacity: 0, y: -5, zIndex: 1, stagger: 5, delay: 6}, 'end');

    el.forEach(element => {
        element.addEventListener('mouseover', ()=> anim.pause(), false);
        element.addEventListener('mouseout', ()=> anim.resume(), false);
    });
}