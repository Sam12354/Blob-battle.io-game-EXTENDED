export const externalVirusFeeding = ({
    virusRef,
    virusFeedAmount,
    virusShootMassThreshold,
    radius,
}) => {
    virusRef.current.forEach(virus => {
        const isFed = false; 

        if (isFed) {
            virus.mass += virusFeedAmount;

            if (virus.mass > virus.baseMass * 3) virus.mass = virus.baseMass * 3;

            if (virus.mass >= virusShootMassThreshold) {
                virus.mass = virus.baseMass;

                virusRef.current.push({
                    id: Date.now() + Math.random(),
                    x: virus.x,
                    y: virus.y,
                    mass: virus.baseMass,
                    baseMass: virus.baseMass,
                    traveledDistance: 0,
                });
            }
        }
    });
};
