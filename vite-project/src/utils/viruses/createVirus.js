export function createVirus(id) {
    return {
        id,
        x: Math.random() * 5000,
        y: Math.random() * 5000,
        mass: 100,
        baseMass: 100,
    };
}

export function createViruses(count) {
    const viruses = [];
    for (let i = 1; i <= count; i++) {
        viruses.push(createVirus(i));
    }
    return viruses;
}
