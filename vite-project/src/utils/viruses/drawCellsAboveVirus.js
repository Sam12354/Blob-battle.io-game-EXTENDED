export const radius = (mass) => Math.sqrt(mass) * 5;

export function drawCellsAboveVirus(ctx, cells, offsetX, offsetY) {
    cells.forEach(cell => {
        ctx.beginPath();
        ctx.arc(offsetX + cell.x, offsetY + cell.y, radius(cell.mass), 0, Math.PI * 2);
        // Draw a circle at the cell's position with size based on its mass
        ctx.fillStyle = 'dodgerblue';
        ctx.strokeStyle = '#003366';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    });
}
