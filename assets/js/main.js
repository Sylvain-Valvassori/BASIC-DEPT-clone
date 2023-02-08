const slider = document.querySelector('.clients__slider__wrapper');
const sliderBox = document.querySelector('.clients__slider__wrapper__box');
const scrollBar = document.querySelector('.clients__slider__scroll-bar');
const cursorScroll = document.getElementById('cursorScroll');

let isDown = false;
let initialPositionX, positionX, sliderInitialPositionX, moveCursorValue;
let sliderWidth, cursorWidth, scrollBarWidth, sliderBoxWidth;


const notActive = () => {
    isDown = false;
}

const getAllSliderInfo = (e) => {

    e.preventDefault();
    isDown = true;
    sliderWidth = slider.clientWidth;
    sliderBoxWidth = sliderBox.clientWidth;
    sliderInitialPositionX = slider.scrollLeft;
    cursorWidth =  cursorScroll.getBoundingClientRect().width;
    scrollBarWidth =  scrollBar.getBoundingClientRect().width;
    
    initialPositionX = e.clientX;
    if(e.type == 'touchstart') initialPositionX = e.touches[0].clientX;
}

const moveSlider = (e) => {

    if (!isDown) return;
    e.preventDefault();

    positionX = e.clientX;
    if(e.type == 'touchmove') positionX = e.touches[0].clientX;
    
    const moveSlider = sliderInitialPositionX - (positionX - initialPositionX);
    slider.scrollLeft = moveSlider;

    moveCursor(moveSlider); 
}

const moveCursor = (moveSlider) => {

    const gapSlider     = scrollBarWidth - cursorWidth;
    const gapScrollBar  = sliderBoxWidth - sliderWidth;
    const ratioSlider   = gapSlider / gapScrollBar;
    
    moveCursorValue = moveSlider * ratioSlider;

    const condition1 = moveCursorValue <= 0; 
    const condition2 = (cursorWidth + moveCursorValue) >=  scrollBarWidth; 

    condition1 ? moveCursorValue = 0 : 
    condition2 ? moveCursorValue = gapSlider : moveCursorValue;
    moveCursorValue;

    return cursorScroll.style.transform = 'translateX( '+ moveCursorValue +'px )';
}


slider.addEventListener('mousedown' , getAllSliderInfo);
slider.addEventListener('mousemove' , moveSlider);
slider.addEventListener('mouseup'   , notActive);
slider.addEventListener('mouseleave', notActive);
// mobile event
slider.addEventListener('touchstart' , getAllSliderInfo, false);
slider.addEventListener('touchmove'  , moveSlider, false);
slider.addEventListener('touchend'   , notActive, false);


