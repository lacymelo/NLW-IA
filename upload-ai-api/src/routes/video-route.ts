import { FastifyInstance } from "fastify"
import { CreateController } from "../modules/create/controller"
import { UpdateController } from "../modules/update/controller"

const createController = new CreateController()
const updateController = new UpdateController()

export async function VideoRoute(app: FastifyInstance) {
    //cria o video
    app.post('/videos', createController.createVideo)

    // atualiza o video
    app.post('/videos/:videoId/transcription', updateController.updateVideo)
} 