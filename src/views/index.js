'use strict'

import express from 'express'
import playerRoute from "./player/index.js"

let app = express()
app.use(express.json())

app.use('/player', playerRoute)

export function start(port) {
    app.listen(port, () => {
        console.log('Server running in http://localhost:3000')
    })
}