export const popPlayerByVirus = (cell, virus, playerRef, virusRef) => {
    const splitCount = 8;
    const angleStep = (2 * Math.PI) / splitCount;
    // Calculate the angle between each split cell so they spread evenly in a circle
    const newCells = [];

    for (let i = 0; i < splitCount; i++) {
        const angle = i * angleStep;
        newCells.push({
            id: Date.now() + Math.random(),
            x: cell.x,
            y: cell.y,
            mass: cell.mass / splitCount,
            // Calculate velocity direction using cosine (x) and sine (y) of the angle to spread split balls evenly
            vx: Math.cos(angle) * 8,
            vy: Math.sin(angle) * 8,
            splitTime: Date.now(),
            canMergeAfter: Date.now() + 15000,
        });
    }

    // Remove original cell
    playerRef.current = playerRef.current.filter(c => c.id !== cell.id);
    // Add smaller split cells
    playerRef.current.push(...newCells);

    // Remove the virus that caused the pop
    virusRef.current = virusRef.current.filter(v => v.id !== virus.id);
};
