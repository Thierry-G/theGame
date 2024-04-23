class Square {
    constructor(ctx, l, espacementH, espacementV, colors) {
        this.ctx = ctx;
        this.l = l;
        this.espacementH = espacementH;
        this.espacementV = espacementV;
        this.colors = colors;
        this.squareNumbers = [];
        this.totalSquares = 0;
    }

    draw(position, verticalPosition, n, m) {
        for (let i = 0; i < n * m; i++) {
            let j = Math.floor(i / n);
            let k = i % n;
            if (position + k * (this.l + this.espacementH) > 0 && position + k * (this.l + this.espacementH) < this.ctx.canvas.width) {
                this.ctx.fillStyle = this.colors[i]; 
                this.ctx.fillRect(position + k * (this.l + this.espacementH), verticalPosition + j * (this.l + this.espacementV), this.l, this.l); 

                if (!this.squareNumbers[i]) {
                    this.totalSquares += 1;
                    this.squareNumbers[i] = this.totalSquares;
                }
                this.ctx.fillStyle = '#FFFFFF'; 
                this.ctx.textAlign = 'center'; 
                this.ctx.textBaseline = 'middle'; 
                this.ctx.fillText(this.squareNumbers[i], position + k * (this.l + this.espacementH) + this.l / 2, verticalPosition + j * (this.l + this.espacementV) + this.l / 2); 
            }
        }
    }
}
