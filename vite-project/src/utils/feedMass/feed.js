export const feed = (mouse, canvas, playerRef, ejectedMassRef, radius) => {
    const minMassToFeed = 27;
    const ejectedMass = 12;

    playerRef.current.forEach(cell => {
        if (cell.mass > minMassToFeed) {
            const angle = Math.atan2(mouse.y - canvas.height / 2, mouse.x - canvas.width / 2);
            // finds the angle (direction) from the center of the canvas to the mouse position
            const speed = 25;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            // Cosine (cos) tells you how far to go sideways (left or right), 
            // and sine (sin) tells you how far to go up or down when moving in a certain direction.

            ejectedMassRef.current.push({
                id: Date.now() + Math.random(),
                // create unique id
                x: cell.x + Math.cos(angle) * radius(cell.mass),
                y: cell.y + Math.sin(angle) * radius(cell.mass),
                // Start the ejected mass just outside the player's cell in the direction of the mouse
                vx,
                vy,
                mass: ejectedMass,
            });

            cell.mass -= ejectedMass * 1.1;
            // Reduce the player's mass slightly more than the ejected amount (10% extra as penalty)
        }
    });
};

