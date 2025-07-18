export function drawVirus(ctx, virus) {
    // Draw the virus body (circle)
    ctx.beginPath();
    ctx.arc(virus.x, virus.y, radius(virus.mass), 0, 2 * Math.PI);
    ctx.fillStyle = '#7CFC00'; // or virus color
    ctx.fill();

    // Draw spikes
    drawVirusSpikes(ctx, virus.x, virus.y, radius(virus.mass));
}

export function drawVirusSpikes(ctx, x, y, r) {
    const spikesCount = 30;
    const spikeLength = r * 0.1;

    ctx.fillStyle = 'green'; // match virus color
    ctx.strokeStyle = '#32CD32';
    ctx.lineWidth = 2;

    for (let i = 0; i < spikesCount; i++) {
        // For each spike, calculate where to place it around the circle
        const angle = (i / spikesCount) * 2 * Math.PI;

        // Calculate the tip of the spike (sticking out from the circle)
        const endX = x + Math.cos(angle) * (r + spikeLength);
        const endY = y + Math.sin(angle) * (r + spikeLength);

        // Calculate the base angles (left and right) for the bottom corners of the spike
        const leftBaseAngle = angle + Math.PI / spikesCount;
        const rightBaseAngle = angle - Math.PI / spikesCount;

        // Get the base points of the spike (still on the edge of the virus circle)
        const leftBaseX = x + Math.cos(leftBaseAngle) * r;
        const leftBaseY = y + Math.sin(leftBaseAngle) * r;
        const rightBaseX = x + Math.cos(rightBaseAngle) * r;
        const rightBaseY = y + Math.sin(rightBaseAngle) * r;

        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(leftBaseX, leftBaseY);
        ctx.lineTo(rightBaseX, rightBaseY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

export const radius = (mass) => Math.sqrt(mass) * 5;