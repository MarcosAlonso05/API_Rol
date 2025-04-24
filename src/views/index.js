'use strict'

import express from 'express'
import playerRoute from "./player/index.js"
import worldRoute from "./world/index.js"
import { initWorldFromSample } from "../models/world/index.js"
import enemyRoute from './enemy/index.js'

let app = express()
app.use(express.json())

initWorldFromSample()

app.use('/player', playerRoute)
app.use('/world', worldRoute)
app.use('/enemy', enemyRoute)

export function start(port) {
    app.listen(port, () => {
        console.log('Server running in http://localhost:3000')
    })
}