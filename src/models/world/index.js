import fs from 'fs'
import path from 'path'

const world = []

export function initWorldFromSample() {
    const content = fs.readFileSync(path.resolve('src/data/sampleWorld.json'))
    const data = JSON.parse(content)
    world.length = 0
    world.push(...data)
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
