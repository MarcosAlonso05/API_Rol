import { createEnemy, getAllEnemies, getEnemyById } from "../../models/enemy/index.js"

const controllerEnemy = {
    create(req, res) {
        const { type, position } = req.body
        const newEnemy = createEnemy(type, position)

        if (newEnemy.error) {
            return res.status(400).send(newEnemy)
        }

        res.status(201).send(newEnemy)
    },

    list(req, res) {
        res.send(getAllEnemies())
    },

    getById(req, res) {
        const enemy = getEnemyById(req.params.id)

        if (!enemy) {
            return res.status(404).send({ error: "Enemy not found" })
        }

        res.send(enemy)
    }
}

export default controllerEnemy
