
function damageCal(attacker, deffender){
    const baseDamage = attacker.power;
    const speedDiff = attacker.speed - deffender.speed;

    const critAttack = Math.max(5, Math.min(50, 20 + speedDiff * 2));
    const missAttack = Math.max(0, 10 - speedDiff);

    const  random = Math.random() * 100;

    if(random < missAttack){
        return {damage: 0, type: "miss"};
    }

    const isCrit = random < critAttack;
    const damage = isCrit ? baseDamage * 2: baseDamage;

    return { damage, type: isCrit ? "critical" : "normal"}
}

function playerTurn(player, enemy){
    const {damage, type} = damageCal(player, enemy);
    enemy.hp -= damage;
    return { damage, type, target: "enemy", enemyHP: enemy.hp };
}

function enemyTurn(enemy, player) {
    const { damage, type } = calculateDamage(enemy, player);
    player.hp -= damage;
    return { damage, type, target: "player", playerHP: player.hp };
}

export function startCombat(player, enemy) {
    const log = [];

    while (player.hp > 0 && enemy.hp > 0) {
        log.push(playerTurn(player, enemy));
        if (enemy.hp <= 0) break;

        log.push(enemyTurn(enemy, player));
    }

    const result = player.hp > 0 ? "player wins" : "enemy wins";
    return { log, result };
}