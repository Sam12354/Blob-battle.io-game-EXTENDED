export function handleFoodCollision(foodRef, playerRef, radius) {
    foodRef.current = foodRef.current.filter(food => {
        for (const cell of playerRef.current) {
            const dx = cell.x - food.x;
            const dy = cell.y - food.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius(cell.mass)) {
                cell.mass += 0.7;
                return false;
                // false means remove that food item from the array (because the player ate it)
            }
        }
        // true means keep the food item in the array (because it wasn’t eaten).
        return true;
    });
}
