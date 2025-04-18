'use strict'

import express from 'express'
import playerRoute from "./player/index.js"
import worldRoute from "./world/index.js"

let app = express()
app.use(express.json())

app.use('/player', playerRoute)
app.use('/world', worldRoute)

export function start(port) {
    app.listen(port, () => {
        console.log('Server running in http://localhost:3000')
    })
}