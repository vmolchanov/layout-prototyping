const DEGREE_STEP = 45;
const MAX_DEGREE = 360;
const LEFT_MOUSE_BUTTON = 0;

const drag = document.querySelector('.drag');
const dragObjects = drag.querySelectorAll('.drag__object');

const dragCoords = {
    x: window.pageXOffset + drag.getBoundingClientRect().left,
    y: window.pageYOffset + drag.getBoundingClientRect().top
};

drag.addEventListener('contextmenu', (e) => {
    const dragObject = e.target.closest('.drag__object');
    if (dragObject === null) {
        return;
    }
    e.preventDefault();

    const container = dragObject.querySelector('g');
    const rotate = Number(dragObject.dataset.rotate);
    const newRotate = rotate === MAX_DEGREE ?
        DEGREE_STEP :
        rotate + DEGREE_STEP;
    container.style.transform = `rotate(${newRotate}deg)`;
    dragObject.dataset.rotate = newRotate;
});

drag.addEventListener('mousedown', (mouseDownEvent) => {
    const dragObject = mouseDownEvent.target.closest('.drag__object');
    if (dragObject === null) {
        return;
    }
        
    let startCoord = {
        x: window.pageXOffset + dragObject.getBoundingClientRect().left,
        y: window.pageYOffset + dragObject.getBoundingClientRect().top
    };

    const offset = {
        x: mouseDownEvent.clientX - dragObject.getBoundingClientRect().x,
        y: mouseDownEvent.clientY - dragObject.getBoundingClientRect().y
    };

    const onMouseMove = (moveEvent) => {
        const {translateX, translateY} = dragObject.dataset;
        const shift = {
            x: startCoord.x - moveEvent.pageX,
            y: startCoord.y - moveEvent.pageY
        };
        const translate = {
            x: Number(translateX) - shift.x,
            y: Number(translateY) - shift.y
        };

        startCoord = {
            x: moveEvent.clientX,
            y: moveEvent.clientY
        };

        dragObject.style.transform = `translate(${translate.x - offset.x}px,${translate.y - offset.y}px)`;
        dragObject.dataset.translateX = translate.x;
        dragObject.dataset.translateY = translate.y;
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        dragObject.dataset.translateX -= offset.x;
        dragObject.dataset.translateY -= offset.y;
    };

    if (mouseDownEvent.button === LEFT_MOUSE_BUTTON) {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
});
