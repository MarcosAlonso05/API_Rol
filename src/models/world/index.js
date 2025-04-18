import {createRoom} from "../room/index.js";

const world = []

const WIDTH = 5
const HEIGHT = 5

export function initWorld(){
    for (let y = 0; y < HEIGHT; y++) {
        let row = []
        for (let x = 0; x < WIDTH; x++) {
            row.push(createRoom(x, y))
        }
        world.push(row)
    }
}

export function getRoom(x, y){
    if (world[y] && world[y][x]){
        return world[y][x]
    }
    return null
}

export function getVisitedRooms() {
    return world.flat().filter(room => room.visited)
}

export function markVisited(x, y) {
    const room = getRoom(x, y)
    if (room) {
        room.visited = true
    }
}

export default world