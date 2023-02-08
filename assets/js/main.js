const slider = document.querySelector('.clients__slider__wrapper');
const sliderBox = document.querySelector('.clients__slider__wrapper__box');
const scrollBar = document.querySelector('.clients__slider__scroll-bar');

const cursorScroll = document.getElementById('cursorScroll');

let isDown = false;
let sliderWidth, sliderInitialPosX, mouseInitialPosX, cursorInitialPosX, moveCursorValue, cursorWidth, scrollBarWidth, sliderBoxWidth;


const notActive = () => {
    isDown = false;
}

const getSliderInfo = (e) => {
    e.preventDefault();
    isDown = true;
    sliderWidth         = slider.clientWidth;
    sliderBoxWidth      = sliderBox.clientWidth;
    sliderInitialPosX   = slider.scrollLeft;
    mouseInitialPosX    = e.clientX;
    
    cursorWidth =  cursorScroll.getBoundingClientRect().width;
    scrollBarWidth =  scrollBar.getBoundingClientRect().width;
}


const moveSlider = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const mousePosX = e.clientX;
    const moveSlider = sliderInitialPosX - (mousePosX - mouseInitialPosX);
    slider.scrollLeft = moveSlider;

    moveCursor(moveSlider); 
}

const moveCursor = (moveSlider) => {

    const gapSlider = scrollBarWidth - cursorWidth;
    const gapScrollBar = sliderBoxWidth - sliderWidth;

    const ratioSlider =  gapSlider / gapScrollBar;
    

    moveCursorValue = moveSlider * ratioSlider;

    condition1 = moveCursorValue <= 0; 
    condition2 = (cursorWidth + moveCursorValue) >=  scrollBarWidth; 

    condition1 ? moveCursorValue = 0 : 
    condition2 ? moveCursorValue = scrollBarWidth - cursorWidth : 
    moveCursorValue;

    moveCursorValue;

    return cursorScroll.style.transform = 'translateX( '+ moveCursorValue +'px )';
}



slider.addEventListener('mousedown' , getSliderInfo);
slider.addEventListener('mouseleave', notActive);
slider.addEventListener('mouseup'   , notActive);
slider.addEventListener('mousemove' , moveSlider);
