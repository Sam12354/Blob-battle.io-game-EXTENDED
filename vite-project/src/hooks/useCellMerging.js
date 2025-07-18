export function useCellMerging(playerRef, radius) {

    function mergeCells(a, b) {
        a.mass += b.mass;
        playerRef.current = playerRef.current.filter(cell => cell.id !== b.id);
    }

    const handleCellMerging = () => {
        const now = Date.now();

        for (let i = 0; i < playerRef.current.length; i++) {
            for (let j = i + 1; j < playerRef.current.length; j++) {
                // Loop through all unique pairs of player cells to check if any can merge.
                // This ensures we compare each cell with every other one (without repeating or comparing itself).

                const a = playerRef.current[i];
                const b = playerRef.current[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = radius(a.mass) + radius(b.mass);

                if (now > a.canMergeAfter && now > b.canMergeAfter && dist <= minDist) {
                    mergeCells(a, b);
                }

            }
        }
    };

    return { handleCellMerging };
}
