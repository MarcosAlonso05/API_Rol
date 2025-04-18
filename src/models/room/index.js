
export function createRoom(x, y) {
    return {
        id: `${x}-${y}`,
        x,
        y,
        description: `Room in (${x}, ${y})`,
        enemies: [],
        items: [],
        visited: false,
    }
}