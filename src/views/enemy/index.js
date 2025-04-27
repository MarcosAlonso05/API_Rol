'use strict'

import { Router } from 'express'
import controllerEnemy from '../../controllers/enemy/index.js'

let router = Router()

router.post('/', (req, res) =>{
    controllerEnemy.create(req, res)
})

router.get('/', (req, res) =>{
    controllerEnemy.list(req, res)
})

router.get('/:id', (req, res) =>{
    controllerEnemy.getById(req, res)
})

export default router
