export const updateEjectedMass = (ejectedMassArray, clamp, mapWidth, mapHeight) => {
    ejectedMassArray.forEach(mass => {
        mass.x += mass.vx;  // Move horizontally
        mass.y += mass.vy;  // Move vertically
        mass.vx *= 0.95; // velocity by 0.95 simulates friction or resistance so it stops the ejected mass
        mass.vy *= 0.95;
        mass.x = clamp(mass.x, 0, mapWidth); // Stay within left/right map bounds
        mass.y = clamp(mass.y, 0, mapHeight); // Stay within top/bottom map bounds
    });
};
