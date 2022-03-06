function Background(image) {

    this.image = image;
    this.width = image.width;
    this.height = image.height;

    /**
     * Draw image in canvas  
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    this.draw = (context) => {

        const shiftX = (context.canvas.width - this.width) / 2;
        const shiftY = (context.canvas.height - this.height) / 2;

        context.drawImage(this.image, 0, 0, this.width, this.height, shiftX - context.canvas.width * 0.25, shiftY, this.width, this.height);
    };

    /**
     * Draw enlarged image in canvas
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {number} x is x coordinate of rectangle
     * @param {number} y is y cooredinate of rectangle 
     * @param {number} width is width of rectangle
     * @param {number} height is height of rectangle
     */
    this.drawEnlargedImage = (context, x, y, width, height) => {
        context.drawImage(this.image, x, y, width, height, context.canvas.width / 2, 0, this.width, this.height);
    }
}
