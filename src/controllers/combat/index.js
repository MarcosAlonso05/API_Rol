import {
    startCombat,
    getCombat,
    performPlayerAction
} from "../../models/combat/index.js"

const combatController = {
    start(req, res) {
        const { player, enemy } = req.body
        if (!player || !enemy) {
            return res.status(400).send({ error: "Missing player or enemy data" })
        }

        const combat = startCombat(player, enemy)
        res.status(201).send(combat)
    },

    get(req, res) {
        const combat = getCombat(req.params.id)
        if (!combat) {
            return res.status(404).send({ error: "Combat not found" })
        }
        res.send(combat)
    },

    action(req, res) {
        const { action } = req.body
        const combat = performPlayerAction(req.params.id, action)

        if (!combat) {
            return res.status(400).send({ error: "Invalid action or combat" })
        }

        res.send(combat)
    }
}

export default combatController