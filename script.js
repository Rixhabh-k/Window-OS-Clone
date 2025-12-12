var navItems = document.querySelector('.navigations');

var nightScreen = document.querySelector('.night-mode');
    
var nightBtn = document.querySelector('.nightBtn');

var main  = document.querySelector('main');
var range = document.querySelector('#brightRange');

// config: change these if you want different limits
const MIN_BRIGHT = parseFloat(getComputedStyle(document.documentElement)
                    .getPropertyValue('--min-brightness')) || 0.85;
const MAX_BRIGHT = parseFloat(getComputedStyle(document.documentElement)
                    .getPropertyValue('--max-brightness')) || 1.15;

// linear interpolation
const lerp = (a, b, t) => a + (b - a) * t;

// perceptual easing (makes slider feel natural)
const GAMMA = 2.2;

let raf = null;

function applyBrightnessFromValue(val) {
    // val is 0..100
    const t = val / 100;
    const perceptualT = Math.pow(t, GAMMA);
    const brightness = lerp(MIN_BRIGHT, MAX_BRIGHT, perceptualT);

    main.style.filter = `brightness(${brightness})`;
}

// on slider change
range.addEventListener('input', function () {
    const v = this.value;
    if (raf) cancelAnimationFrame(raf);

    raf = requestAnimationFrame(() => {
        applyBrightnessFromValue(v);
        raf = null;
    });
});

// initialize
applyBrightnessFromValue(range.value);


nightBtn.addEventListener("click",function(){
    nightScreen.classList.toggle("active")
    
})

navItems.addEventListener("click",function(e){
    
    const item = e.target.closest(".nav-item")
    if(!item) return;
    item.classList.toggle("active")
    
})

var settings = document.querySelector('.options-popup');
var tabIcons = document.querySelector('.tab-icons');


tabIcons.addEventListener('click',function(e){
    e.stopPropagation();
    settings.classList.toggle("open");
    
})

// CLOSE when clicking anywhere on main EXCEPT inside popup
main.addEventListener('click', function(e){
    // if popup is open and click is outside popup
    if (settings.classList.contains("open") && !settings.contains(e.target)) {
        settings.classList.remove("open");
    }
});

// If someone clicks INSIDE popup, do not close it
settings.addEventListener('click', function(e){
    e.stopPropagation();
});


const menu = document.querySelector('.context-menu');

// open at right-click position
document.addEventListener('contextmenu', function (e) {
    e.preventDefault(); // stop default browser menu

    // place at cursor position
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";

    // open menu
    menu.classList.add("open");
});

// close when clicking anywhere else
document.addEventListener('click', function (e) {
    if (!menu.contains(e.target)) {
        menu.classList.remove("open");
    }
});


