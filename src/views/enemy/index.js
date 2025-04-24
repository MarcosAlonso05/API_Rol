'use strict'

import { Router } from 'express'
import controllerEnemy from '../../controllers/enemy/index.js'

let router = Router()

router.post('/', controllerEnemy.create)
router.get('/', controllerEnemy.list)
router.get('/:id', controllerEnemy.getById)

export default router
