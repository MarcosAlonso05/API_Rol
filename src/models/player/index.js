import classes from "../classes";

let players = []

export function createPlayer({name, classe}) {
    const classData = classes[classe.toLowerCase()]
    if(!classData){
        return {error: "No valid class"}
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
    }

    players.push(newPlayer)
    return newPlayer
}

export function getPlayerByID(id){
    return players.find(j => j.id === parseInt(id))
}

export function getAllPlayers(){
    return players
}

export default players