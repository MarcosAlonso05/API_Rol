'use strict'

import playerController from "../../controllers/player/index.js"
import { Router } from 'express'

let router = Router()

// Obtener info del player
router.get('/', (req, res) => {
    res.send(playerController.getPlayer())
})

// Obtener info de la habitación actual del player
router.get('/room', (req, res) => {
    res.send(playerController.getHabitacionActual())
})

// Mover player a una habitación específica (PUT /player/room/1-2)
router.put('/room/:id', (req, res) => {
    const result = playerController.movePlayer(req.params.id)
    if (result.error) {
        res.status(400).send(result)
    } else {
        res.send(result)
    }
})

export default router