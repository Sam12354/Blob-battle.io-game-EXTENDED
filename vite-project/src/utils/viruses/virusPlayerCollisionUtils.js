export const handleVirusPlayerCollision = ({
    playerRef,
    virusRef,
    radius,
    popPlayerByVirus,
}) => {
    playerRef.current.forEach(cell => {
        virusRef.current.forEach(virus => {
            const dx = cell.x - virus.x;
            const dy = cell.y - virus.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const virusRadius = radius(virus.mass);
            const cellRadius = radius(cell.mass);

            if (dist < virusRadius + cellRadius) {
                if (cell.mass > virus.mass) {
                    popPlayerByVirus(cell, virus, playerRef, virusRef); 
                }
            }
        });
    });
};
