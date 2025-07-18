export const updatePlayerCells = (playerCells, clamp, mapWidth, mapHeight) => {
    const now = Date.now();

    playerCells.forEach(cell => {
        if (now - cell.splitTime > 1000) {
            cell.vx *= 0.9; // reduce horizontal speed by 10%
            cell.vy *= 0.9; // reduce vertical speed by 10%
            // If speed is very low, stop movement completely
            if (Math.abs(cell.vx) < 0.01) cell.vx = 0;
            if (Math.abs(cell.vy) < 0.01) cell.vy = 0;
        }

        // Update cell position by adding current velocity
        cell.x += cell.vx || 0;
        cell.y += cell.vy || 0;

        // Keep the cell position inside the map limits
        cell.x = clamp(cell.x, 0, mapWidth);
        cell.y = clamp(cell.y, 0, mapHeight);
    });
};
