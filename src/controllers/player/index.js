import { createPlayer, getAllPlayers, getPlayerByID } from "../../models/player/index.js"

const controllerPlayers = {
    create(req, res) {
        const {name, classe} = req.body
        const newP = createPlayer({name, classe})

        if (newP.error){
            return res.status(400).send(newP.error)
        }
        res.status(201).send(newP)
    },

    listP(req, res) {
        const all = getAllPlayers()
        res.send(all)
    },

    getPlayerByID(req, res){
        const player = getPlayerByID(req.params.id)

        if (!player) {
            return res.status(404).send({error: "player not found"})
        }

        res.send(player)
    }
}

export default controllerPlayers