function Rectangle(width, height) {

    this.x = 0;
    this.y = 0;

    this.width = width;
    this.height = height;

    /**
     * Handles drawing of rectangle 
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {number} x 
     * @param {number} y 
     */
    this.draw = (context, x, y) => {

        this.x = x;
        this.y = y;

        context.fillStyle = "#0096FF";
        context.globalAlpha = 0.5;

        this.calculateOrigin(context);
        context.fillRect(this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;
    };

    /**
     * Calculate origin of rectangle (top-left coordinate)
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    this.calculateOrigin = (context) => {

        const minX = this.width / 2;
        const minY = this.height / 2;
        const maxX = context.canvas.width - context.canvas.width / 2 - this.width / 2;
        const maxY = context.canvas.height - this.height / 2;

        this.x = this.x < minX ? minX : this.x > maxX ? maxX : this.x;
        this.y = this.y < minY ? minY : this.y > maxY ? maxY : this.y;

        this.x -= this.width / 2;
        this.y -= this.height / 2;
    }
}