export const getTileCoordinates = (tileElement: HTMLElement, container: HTMLElement | null) => {
    const containerRect = container?.getBoundingClientRect();
    const tileRect = tileElement.getBoundingClientRect();

    return {
        x: tileRect.left - (containerRect?.left || 0) + tileRect.width / 2,
        y: tileRect.top - (containerRect?.top || 0) + tileRect.height / 2,
    };
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const randomizeMoves = (entries: [string, any][], difficulty: string) => {
    if (difficulty === 'hard') return entries;

    for (let i = entries.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [entries[i], entries[j]] = [entries[j], entries[i]];
    }

    return entries;
};

interface Tile {
    row: number;
    col: number;
    letter: string;
    x: number;
    y: number;
}

export const isTileSelected = (row: number, col: number, selectedTiles: Tile[]): boolean =>
    selectedTiles.some((tile) => tile.row === row && tile.col === col);
