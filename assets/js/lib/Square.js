export default class Square {
    constructor(ctx, x, y, size, color, number, randomNumber) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.number = number;
        this.randomNumber = randomNumber;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.size, this.size);

        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.number + ' (' + this.randomNumber + ')', this.x + this.size / 2, this.y + this.size / 2);
    }

    isClicked(x, y) {
        return x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size;
    }
}
