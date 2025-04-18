import world, {getRoom, getVisitedRooms, markVisited} from "../../models/world/index.js";

const controllerWorld = {
    getVisited(req, res){
        const visited = getVisitedRooms()
        res.send(visited)
    },

    getRoom(req, res){
        const [x, y] = req.params.id.split("-").map(Number)

        const room = getRoom(x, y)

        if(!room){
            return res.status(404).send({error: "Room found"})
        }

        res.send(room)
    },

    markVisited(req, res) {
        const [x, y] = req.params.id.split("-").map(Number)
        const room = getRoom(x, y)

        if (!room) {
            return res.status(404).send({ error: "Room found" })
        }

        markVisited(x, y)
        res.send({ message: `Room ${x}-${y} visited` })
    }
}

export default controllerWorld