'use strict'

import { Router } from 'express'
import combatController from "../../controllers/combat/index.js";

let router = Router()

router.post("/start", combatController.start)
router.get("/:id", combatController.get)
router.post("/:id/action", combatController.action)

export default router