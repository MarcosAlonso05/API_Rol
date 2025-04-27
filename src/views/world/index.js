'use strict'

import { Router } from 'express'
import controllerWorld from "../../controllers/world/index.js";

let router = Router()

router.get('/', controllerWorld.getAllWorld)

router.get('/visited', controllerWorld.getVisited)

router.get('/:id', controllerWorld.getRoom)

router.put('/:id', controllerWorld.markVisited)

export default router
