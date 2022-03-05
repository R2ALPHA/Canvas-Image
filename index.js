const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

if (!context) {
    throw new Error('Canavs is not supported by ther browser');
}

// Image properties 
const IMAGE_WIDTH = canvas.width / 2;
const IMAGE_HEIGHT = canvas.height;
const WHITE_COLOR = "#FFFFFF";
const IMAGE_SOURCE = 'https://rukminim2.flixcart.com/image/832/832/k0o69ow0/smartwatch/3/s/c/mwv82hn-a-apple-original-imafkffzz6ppzemy.jpeg?q=70'

let backgroundImage = null;
let rectangleObject = null;

// Rectangle properties 
const RECTANGLE_WIDTH = 200;
const RECTANGLE_HEIGHT = 200;

/**
 * Get mouse point relative to canvas
 * 
 * @param {HTMLElement} canvas 
 * @param {number} x 
 * @param {number} y 
 */
function windowToCanvas(canvas, x, y) {
    const bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    }
}

/**
 * Create image object to be used in canvas 
 * 
 * @param {string} src 
 */
function createImage(src) {

    const image = new Image();
    image.src = src;
    image.width = IMAGE_WIDTH;
    image.height = IMAGE_HEIGHT;
    image.crossOrigin = "anonymous";

    return image;
};

/**
 * Clear canvas and repaint canvas 
 */
function repaintCanvas() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = WHITE_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draw hover info on canvas 
 */
function drawHoverInfoText() {

    canvas.style.cursor = "default";

    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '20pt Arial';
    context.fillText('Hover on image to view enlarged image', canvas.width * 0.75, canvas.height / 2);
}

/**
 * Draw objects in canvas 
 * 
 * @param {number} x is current x coordinate relative to canvas 
 * @param {number} y is current y coordinate relative to canvas 
 */
function draw(x, y) {

    if (!backgroundImage) {
        return;
    }

    backgroundImage.draw(context);

    if (x > canvas.width / 2 || y > canvas.height || x < 0 || y < 0) {
        drawHoverInfoText()
        return;
    }

    canvas.style.cursor = "move";

    rectangleObject.draw(context, x, y);
    backgroundImage.drawEnlargedImage(context, rectangleObject.x, rectangleObject.y, rectangleObject.width, rectangleObject.height);
}

const image = createImage(IMAGE_SOURCE);
image.onload = () => {

    backgroundImage = new Background(image);
    backgroundImage.draw(context);
    drawHoverInfoText();
}

rectangleObject = new Rectangle(RECTANGLE_WIDTH, RECTANGLE_HEIGHT);

/**
 * Add listener on mouse move 
 * 
 * @param {MouseEvent} event 
 */
window.onmousemove = (event) => {

    event.preventDefault();
    repaintCanvas();

    const loc = windowToCanvas(canvas, event.clientX, event.clientY);
    draw(loc.x, loc.y);
}