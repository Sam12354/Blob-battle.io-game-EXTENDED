export const handleSplit = (playerRef, mouseRef, canvas, radius, mergeDelay = 3000) => {
    const now = Date.now();
    const newParts = [];

    playerRef.current.forEach(cell => {
        if (cell.mass >= 35 && playerRef.current.length + newParts.length < 16) {
            const newMass = cell.mass / 2;
            cell.mass = newMass;
            cell.canMergeAfter = now + mergeDelay;
            
            const angle = Math.atan2(
                mouseRef.current.y - canvas.height / 2,
                mouseRef.current.x - canvas.width / 2
            );
            const speed = 4;
            // Calculate a small offset to spawn the split cell slightly away from the original to prevent overlap
            const offset = radius(newMass) * 0.5;

            newParts.push({
                id: Date.now() + Math.random(),
                // Position the new cell slightly offset from the original cell along the split angle (horizontal)
                // to prevent overlap right after splitting
                x: cell.x + Math.cos(angle) * offset,
                // Position the new cell slightly offset from the original cell along the split angle (vertical)
                y: cell.y + Math.sin(angle) * offset,
                mass: newMass,
                // Set horizontal velocity to move the new cell toward the mouse direction
                vx: Math.cos(angle) * speed,
                // Set vertical velocity to move the new cell toward the mouse direction
                vy: Math.sin(angle) * speed,
                splitTime: now,
                canMergeAfter: now + mergeDelay
            });

            cell.splitTime = now;
        }
    });

    playerRef.current.push(...newParts);
};
