export function handleEjectedMassCollision(ejectedMassRef, playerRef, radius) {
    ejectedMassRef.current = ejectedMassRef.current.filter(mass => {
        for (const cell of playerRef.current) {
            const dx = cell.x - mass.x; // how far left/right the mass is from the cell
            const dy = cell.y - mass.y; // how far up/down the mass is from the cell
            const dist = Math.sqrt(dx * dx + dy * dy);
            // Calculate the distance between the cell and the ejected mass using Pythagoras' theorem
            if (dist < radius(cell.mass)) {
                cell.mass += mass.mass;
                return false; // remove this ejected mass from array
            }
        }
        return true;
    });
}
