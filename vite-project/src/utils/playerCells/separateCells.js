export const separateCells = (playerRef, radius, clamp, mapWidth, mapHeight) => {
    for (let i = 0; i < playerRef.current.length; i++) {
        for (let j = i + 1; j < playerRef.current.length; j++) {
            const a = playerRef.current[i];
            const b = playerRef.current[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = radius(a.mass) + radius(b.mass) + 2;

            if (dist < minDist && dist > 0) {
                const overlap = minDist - dist;
                const pushX = (dx / dist) * (overlap / 2);
                const pushY = (dy / dist) * (overlap / 2);

                a.x -= pushX;
                a.y -= pushY;
                b.x += pushX;
                b.y += pushY;

                a.x = clamp(a.x, 0, mapWidth);
                a.y = clamp(a.y, 0, mapHeight);
                b.x = clamp(b.x, 0, mapWidth);
                b.y = clamp(b.y, 0, mapHeight);
            }
        }
    }
};
// Pushes overlapping player cells apart so they don't stack, keeping them inside map bounds
