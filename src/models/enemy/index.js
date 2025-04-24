import npc_types from "../npc_types/index.js";

let enemies = []

export function createEnemy(npc_type, position = { x: 0, y: 0 }){
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

export default enemies