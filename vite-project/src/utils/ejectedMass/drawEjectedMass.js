export const radius = (mass) => Math.sqrt(mass) * 5;
// Calculate the radius of a circle based on its mass (bigger mass = bigger size)
// Uses square root for smoother size growth

export function drawEjectedMass(ctx, ejectedMassArray, offsetX, offsetY) {
    ejectedMassArray.forEach(m => {
        ctx.beginPath();
        ctx.arc(offsetX + m.x, offsetY + m.y, radius(m.mass), 0, Math.PI * 2);
        ctx.fillStyle = '#0096FF'; 
        ctx.fill();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    });
}
