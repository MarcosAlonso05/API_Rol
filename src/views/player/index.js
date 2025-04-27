'use strict'

import { Router } from 'express'
import controllerPlayers from "../../controllers/player/index.js";

let router = Router()

router.post('/', (req, res) =>{
    controllerPlayers.create(req, res)
})

router.get('/', (req, res) =>{
    controllerPlayers.listP(req, res)
})

router.get('/:id', (req, res) =>{
    controllerPlayers.getPlayerByID(req, res)
})

router.post('/:id/move', (req, res) =>{
    controllerPlayers.move(req, res)
})
export default router