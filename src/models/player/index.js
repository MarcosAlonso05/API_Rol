import fs from "fs";
import path from "path";
import classes from "../classes/index.js";


import world, { markVisited }        from "../world/index.js"
import { getEnemyByPosition } from "../enemy/index.js"
import { startCombat }        from "../combat/index.js"

let players = [];

export function initPlayersFromSample() {
    const content = fs.readFileSync(path.resolve("src/data/samplePlayers.json"));
    const data = JSON.parse(content);
    players.length = 0;
    players.push(...data);
}

export function createPlayer({ name, classe }) {
    const classData = classes[classe.toLowerCase()];
    if (!classData) {
        return { error: "No valid class" };
    }

    const newPlayer = {
        id: players.length + 1,
        name,
        classe,
        hp: classData.hp,
        mp: classData.mp,
        power: classData.power,
        speed: classData.speed,
        position: { x: 0, y: 0 },
        inventory: [],
    };

    players.push(newPlayer);
    return newPlayer;
}

export function getPlayerByID(id) {
    return players.find(j => j.id === parseInt(id));
}

export function getAllPlayers() {
    return players;
}

export function movePlayer(id, direction) {
    const player = players.find(p => p.id === parseInt(id));
    if (!player) return { error: "Player not found" };

    let { x, y } = player.position;

    switch (direction) {
        case "north": y -= 1; break;
        case "south": y += 1; break;
        case "west":  x -= 1; break;
        case "east":  x += 1; break;
        default:
            return { error: "Invalid direction" };
    }

    if (y < 0 || y >= world.length || x < 0 || x >= world[0].length) {
        return { error: "Cannot move outside the world" };
    }

    player.position = { x, y };

    markVisited(x, y);

    const enemy = getEnemyByPosition(x, y);
    if (enemy) {
        const combat = startCombat(player, enemy);
        return {
            message: `Player moved ${direction} and encountered a ${enemy.type}!`,
            combatId: combat.id,
            combat
        };
    }

    return { message: `Player moved ${direction}`, position: player.position }
}

export default players;
