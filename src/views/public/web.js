
const mapEl = document.getElementById('map');
const attackBtn = document.getElementById('attack-btn');
let playerId = null;
let currentCombatId = null;

async function loadWorld() {
    const [worldRes, playersRes] = await Promise.all([
        fetch('/world'),
        fetch('/player')
    ]);
    const world   = await worldRes.json();
    const players = await playersRes.json();

    const player = players[0];
    playerId = player.id;

    const rows = world.length;
    const cols = world[0]?.length || 0;
    mapEl.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    mapEl.innerHTML = '';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const room = world[y][x];
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (player.position.x === x && player.position.y === y) {
                cell.classList.add('player');
            } else if (room.visited) {
                cell.classList.add('visited');
            } else {
                cell.classList.add('unvisited');
            }

            if (room.enemies && room.enemies.length > 0) {
                cell.classList.add('enemy');
            }

            mapEl.appendChild(cell);
        }
    }
}

async function move(direction) {
    const res = await fetch(`/player/${playerId}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction })
    });
    const data = await res.json();

    if (data.error) {
        alert(data.error);
    } else {
        if (data.combatId) {
            currentCombatId = data.combatId;
            alert(`¡Combate iniciado! ID: ${currentCombatId}`);
        }
        await loadWorld();
    }
}

async function attack() {
    if (!currentCombatId) {
        alert('No hay combate activo');
        return;
    }
    const res = await fetch(`/combat/${currentCombatId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'attack' })
    });
    const data = await res.json();
    if (data.error) {
        alert(data.error);
    } else {
        const last = data.log[data.log.length - 1];
        alert(`Turno ${last.actor}: ${last.type} ${last.damage} pts`);
        if (data.finished) {
            alert(data.log.find(e => e.result)?.result);
            currentCombatId = null;
        }
        await loadWorld();
    }
}

document.querySelectorAll('button[data-dir]').forEach(btn => {
    btn.addEventListener('click', () => move(btn.dataset.dir));
});
attackBtn.addEventListener('click', attack);

window.addEventListener('DOMContentLoaded', loadWorld);
