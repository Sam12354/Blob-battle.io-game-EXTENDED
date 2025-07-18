export const createFood = (count, maxX, maxY) => {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    const food = [];
    for (let i = 0; i < count; i++) {
        food.push({
            x: Math.random() * maxX,
            y: Math.random() * maxY,
            mass: 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            // pick the color at random
        });
    }
    return food;
};
