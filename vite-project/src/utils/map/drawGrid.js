export const drawGrid = (ctx, offsetX, offsetY, width, height, gridSize = 50) => {
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(offsetX + x, offsetY);
        ctx.lineTo(offsetX + x, offsetY + height);
        ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY + y);
        ctx.lineTo(offsetX + width, offsetY + y);
        ctx.stroke();
    }
};
