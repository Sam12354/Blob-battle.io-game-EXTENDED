export function drawFood(ctx, foodArray, offsetX, offsetY) {
    foodArray.forEach(f => {
        ctx.beginPath();
        ctx.arc(offsetX + f.x, offsetY + f.y, f.mass, 0, Math.PI * 2);
        ctx.fillStyle = f.color;
        ctx.fill();
        ctx.strokeStyle = '#660000';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    });
}
