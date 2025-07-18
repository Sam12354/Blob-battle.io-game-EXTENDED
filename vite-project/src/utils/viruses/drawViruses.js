export const radius = (mass) => Math.sqrt(mass) * 5;

export function drawViruses(ctx, viruses, offsetX, offsetY) {
    viruses.forEach(virus => {
        ctx.beginPath();
        ctx.arc(offsetX + virus.x, offsetY + virus.y, radius(virus.mass), 0, Math.PI * 2);
        ctx.fillStyle = '#66FF00';
        ctx.strokeStyle = '#004400';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    });
}