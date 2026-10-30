/**
 * The hero fade (template 2.6.3, BRA-1248). A hero photo carries `data-hero-img`; this script, inlined in <head> so it
 * runs before any image arrives, marks it `data-hero-ready` once it has loaded and decoded (a load event, or already
 * complete), and globals.css fades it in. Only while this ran (html.hero-fade) is an unready hero hidden, so without
 * JS it simply shows; an error, or 4 s without a load, shows it anyway; under reduced motion it appears without the
 * fade. Client-side navigation is covered by the same document-level listener.
 */
export const HERO_FADE_SCRIPT = `(function(){
var d=document.documentElement;d.classList.add('hero-fade');
function show(i){i.setAttribute('data-hero-ready','')}
function ready(i){if(i.hasAttribute('data-hero-ready'))return;if(i.decode){i.decode().then(function(){show(i)},function(){show(i)})}else show(i)}
function hero(t){return t&&t.hasAttribute&&t.hasAttribute('data-hero-img')}
document.addEventListener('load',function(e){if(hero(e.target))ready(e.target)},true);
document.addEventListener('error',function(e){if(hero(e.target))show(e.target)},true);
function sweep(){var l=document.querySelectorAll('img[data-hero-img]');for(var k=0;k<l.length;k++){if(l[k].complete)ready(l[k])}}
document.addEventListener('DOMContentLoaded',sweep);
setTimeout(function(){var l=document.querySelectorAll('[data-hero-img]');for(var k=0;k<l.length;k++)show(l[k])},4000);
})();`
