'use strict'

import express from 'express'
import playerRoute from "./player/index.js"
import worldRoute from "./world/index.js"
import { initWorldFromSample } from "../models/world/index.js"
import { initPlayersFromSample } from "../models/player/index.js";
import { initEnemiesFromSample } from '../models/enemy/index.js'
import enemyRoute from "./enemy/index.js"
import combatRoute from"./combat/index.js"

let app = express()
app.use(express.json())

initWorldFromSample()
initPlayersFromSample();
initEnemiesFromSample();

app.get('/', (req, res) => {
    res.send('Bienvenido al API Rool');
});

app.use('/player', playerRoute)
app.use('/world', worldRoute)
app.use('/enemy', enemyRoute)
app.use('/combat', combatRoute)

export function start(port) {
    app.listen(port, () => {
        console.log('Server running in http://localhost:3000')
    })
}