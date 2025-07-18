export function splitCellsByVirusSize(cells, viruses) {
    const smaller = []; // than a virus
    const bigger = []; // than a virus

    for (const cell of cells) {
        let isSmaller = false;

        for (const virus of viruses) {
            if (cell.mass < virus.mass) {
                isSmaller = true;
                break;
            }
        }

        if (isSmaller) {
            smaller.push(cell);
        } else {
            bigger.push(cell);
        }
    }
    return { smaller, bigger };
}
