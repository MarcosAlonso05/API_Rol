import enemies, { removeEnemyById } from "../enemy/index.js";
import { getRoom }                 from "../world/index.js"

let combats = []

export function startCombat(player, enemy) {
    const combat = {
        id: combats.length + 1,
        player,
        enemy,
        turn: "player",
        finished: false,
        log: [],
    }

    combats.push(combat)
    return combat
}

export function getCombat(id) {
    return combats.find(c => c.id === parseInt(id))
}

export function performPlayerAction(combatId, action) {
    const combat = getCombat(combatId)
    if (!combat || combat.finished) return null

    let result
    if (action === "attack") {
        result = calculateDamage(combat.player, combat.enemy)
        combat.enemy.hp -= result.damage
        combat.log.push({ actor: "player", ...result })

        if (combat.enemy.hp <= 0) {
            combat.finished = true
            combat.log.push({ result: "Player wins!" })
            removeEnemyById(combat.enemy.id)

            const { x, y } = combat.enemy.position;
            const room = getRoom(x, y);
            if (room) {
                room.enemies = room.enemies.filter(e => e.id !== combat.enemy.id);
            }

            return combat
        }

        const enemyResult = calculateDamage(combat.enemy, combat.player)
        combat.player.hp -= enemyResult.damage
        combat.log.push({ actor: "enemy", ...enemyResult })

        if (combat.player.hp <= 0) {
            combat.finished = true
            combat.log.push({ result: "Enemy wins!" })
        }
    }

    return combat
}

function calculateDamage(attacker, defender) {
    const baseDamage = attacker.power;
    const speedDiff = attacker.speed - defender.speed;

    const critAttack = Math.max(5, Math.min(50, 20 + speedDiff * 2));
    const missAttack = Math.max(0, 10 - speedDiff);

    const random = Math.random() * 100;

    if (random < missAttack) {
        return { damage: 0, type: "miss" };
    }

    const isCrit = random < critAttack;
    const damage = isCrit ? baseDamage * 2 : baseDamage;

    return { damage, type: isCrit ? "critical" : "normal" };
}

export {combats}