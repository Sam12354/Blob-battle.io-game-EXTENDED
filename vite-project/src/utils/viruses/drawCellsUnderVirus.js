export function radius(mass) {
    return Math.sqrt(mass) * 5;
}

export function drawCells(ctx, cells, offsetX, offsetY, options = {}) {
    const { fillStyle = 'dodgerblue', strokeStyle = '#003366', lineWidth = 3 } = options;

    cells.forEach(cell => {
        ctx.beginPath();
        ctx.arc(offsetX + cell.x, offsetY + cell.y, radius(cell.mass), 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    });
}
