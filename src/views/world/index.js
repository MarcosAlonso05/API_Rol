'use strict'

import { Router } from 'express'
import controllerWorld from "../../controllers/world";

let router = Router()

router.get('/', controllerWorld.getVisited)

router.get('/:id', controllerWorld.getRoom)

router.put('/:id', controllerWorld.markVisited)

export default router