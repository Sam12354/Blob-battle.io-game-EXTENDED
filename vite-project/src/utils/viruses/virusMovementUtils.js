export const updateVirusPositions = ({
    virusRef,
    radius,
    mapWidth,
    mapHeight,
    virusMaxDistance,
}) => {
    virusRef.current = virusRef.current.filter(virus => {
        virus.x += virus.vx || 0;
        virus.y += virus.vy || 0;

        if (virus.x - radius(virus.mass) < 0 || virus.x + radius(virus.mass) > mapWidth) {
            virus.vx *= -1;
            virus.x = Math.max(radius(virus.mass), Math.min(virus.x, mapWidth - radius(virus.mass)));
        }
        if (virus.y - radius(virus.mass) < 0 || virus.y + radius(virus.mass) > mapHeight) {
            virus.vy *= -1;
            virus.y = Math.max(radius(virus.mass), Math.min(virus.y, mapHeight - radius(virus.mass)));
        }

        if (virus.vx && virus.vy) {
            const frameDistance = Math.sqrt(virus.vx * virus.vx + virus.vy * virus.vy);
            virus.traveledDistance = (virus.traveledDistance || 0) + frameDistance;

            if (virus.traveledDistance > virusMaxDistance) {
                virus.vx = 0;
                virus.vy = 0;
            }
        }

        return true;
    });
};

// This function updates the position of all moving viruses on the map:
// - Moves each virus based on its velocity (vx, vy)
// - Bounces the virus off the map edges by reversing direction if it hits a wall
// - Tracks how far the virus has traveled, and stops it if it goes beyond a max distance
