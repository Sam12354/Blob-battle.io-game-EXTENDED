export const feedVirusWithEjectedMass = ({
    playerRef,
    ejectedMassRef,
    virusRef,
    virusFeedAmount,
    radius,
}) => {
    playerRef.current.forEach(cell => {
        ejectedMassRef.current?.forEach((mass, i) => {
            virusRef.current.forEach(virus => {
                // Calculate the horizontal (dx) and vertical (dy) distance between the ejected mass and the virus
                const dx = mass.x - virus.x;
                const dy = mass.y - virus.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const virusRadius = radius(virus.mass);
                const massRadius = radius(mass.mass);

                if (dist < virusRadius + massRadius) {
                    // ejected mass dissapears after feeding the virus
                    ejectedMassRef.current.splice(i, 1);

                    virus.mass += virusFeedAmount;
                    // increase virus mass when it eats ejected mass

                    virus.feedCount = (virus.feedCount || 0) + 1;
                    // use 0 if vuris is undefined and every time you feed virus add + 1

                    // Remember which way the mass came from when it hit the virus
                    virus.lastFeedVx = virus.x - mass.x;
                    virus.lastFeedVy = virus.y - mass.y;

                    if (virus.mass > virus.baseMass * 3) {
                        virus.mass = virus.baseMass * 3;
                        // virus max size to grow
                    }

                    if (virus.feedCount >= 7) {
                        virus.feedCount = 0;
                        virus.mass = virus.baseMass;

                        const shootAngle = Math.atan2(virus.lastFeedVy, virus.lastFeedVx);

                        virusRef.current.push({
                            id: Date.now() + Math.random(),
                            // Place the new virus at the same position as the one that exploded
                            x: virus.x,
                            y: virus.y,
                            mass: virus.baseMass,
                            // This makes the new virus move quickly in the same direction the last mass came from.
                            vx: Math.cos(shootAngle) * 7,
                            vy: Math.sin(shootAngle) * 7,
                            baseMass: virus.baseMass,
                            traveledDistance: 0,
                            feedCount: 0,
                        });
                    }
                }
            });
        });
    });
};
