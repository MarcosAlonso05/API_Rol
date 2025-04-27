import fs from 'fs'
import path from 'path'
import npc_types from "../npc_types/index.js";

let enemies = []
let currentId = 1

export function initEnemiesFromSample() {
    const content = fs.readFileSync(path.resolve('src/data/sampleEnemies.json'))
    const data = JSON.parse(content)

    enemies.length = 0

    for (const enemy of data) {
        createEnemy(enemy.type, enemy.position)
    }
}

export function createEnemy(npc_type, position = { x: 0, y: 0 }) {
    const typeData = npc_types[npc_type]

    if (!typeData) {
        return { error: "Invalid enemy type" }
    }

    const newEnemy = {
        id: currentId++,
        type: npc_type,
        hp: typeData.hp,
        mp: typeData.mp,
        power: typeData.power,
        speed: typeData.speed,
        description: typeData.description,
        position
    }

    enemies.push(newEnemy)
    return newEnemy
}

export function getAllEnemies() {
    return enemies
}

export function getEnemyById(id) {
    return enemies.find(e => e.id === parseInt(id))
}

export function removeEnemyById(id) {
    const idx = enemies.findIndex(e => e.id === parseInt(id));
    if (idx !== -1) enemies.splice(idx, 1);
}

export function getEnemyByPosition(x, y) {
    return enemies.find(e => e.position.x === x && e.position.y === y)
}

export default enemies
