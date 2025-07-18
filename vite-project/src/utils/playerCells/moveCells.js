export const moveCellsTowardMouse = (canvas, playerRef, mouseRef, maxSpeed) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const avgX = playerRef.current.reduce((sum, c) => sum + c.x, 0) / playerRef.current.length;
    const avgY = playerRef.current.reduce((sum, c) => sum + c.y, 0) / playerRef.current.length;
    // Calculate the average position (center of mass) of all player cells to coordinate their movement

    playerRef.current.forEach(cell => {

        const dx = mouseRef.current.x - centerX - (cell.x - avgX);
        const dy = mouseRef.current.y - centerY - (cell.y - avgY);
        // Figure out how far the cell is from the mouse by comparing positions, adjusted for camera and average cell location
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 8) {
            const angle = Math.atan2(dy, dx);
            const speed = Math.min(maxSpeed, 20 / Math.sqrt(cell.mass));
            cell.x += Math.cos(angle) * speed;
            cell.y += Math.sin(angle) * speed;
            // Move the cell toward the mouse direction at a speed based on its mass

        } else {
            // Snap to target when close enough to prevent jitter
            cell.x = avgX + (mouseRef.current.x - centerX);
            cell.y = avgY + (mouseRef.current.y - centerY);
        }
    });
};
